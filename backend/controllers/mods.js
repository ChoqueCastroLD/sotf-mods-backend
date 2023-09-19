import slugify from "slugify";
import semver from "semver";
import { Image } from "imagescript"

import { getMod, getMods, countMods, getModsFromUser, countModsFromUser } from "../services/mods.js";
import { uploadFile } from "../util/drive.js";
import { prisma } from "../services/prisma.js";

const ALLOWED_RESOLUTIONS = [
  { width: 2560, height: 1440 },
  { width: 1080, height: 608 }
];

const BASE_URL = process.env.BASE_URL + "";

function validateModName(modName) {
  let name = modName.trim();
  if (name.length < 4) {
    throw "Mod name must be at least 3 characters long.";
  }
  if (name.length > 24) {
    throw "Mod name must be less than 50 characters long.";
  }
  const allowedPattern = /^[a-zA-Z0-9,.¡!¿?$%&()#+;'" _-]+$/;
  if (!allowedPattern.test(name)) {
    throw "Mod name must only contain letters, numbers, spaces, dashes and underscores.";
  }
  return name;
}

function validateModDescription(modDescription) {
  let description = modDescription.trim();
  if (description.length < 10) {
    throw "Mod description must be at least 10 characters long.";
  }
  if (description.length > 2000) {
    throw "Mod description must be less than 2000 characters long. ("+description.length+")";
  }
  return description;
}

function validateModShortDescription(modShortDescription) {
  let shortDescription = modShortDescription.trim();
  if (shortDescription.length < 10) {
    throw "Mod description must be at least 10 characters long.";
  }
  if (shortDescription.length > 100) {
    throw "Mod description must be less than 100 characters long. ("+modShortDescription.length+")";
  }
  return shortDescription;
}

export default {
  getMods: async (ctx) => {
    const page = parseInt(ctx.request.query?.page || "1");
    const number = parseInt(ctx.request.query?.number || "10");
    const search = (ctx.request.query?.search || "").trim();
    const nsfw = ctx.request.query?.nsfw === "true";
    
    const mods = (await getMods(page, number, search, nsfw)).map((mod) => {
      delete mod.id;
      delete mod.userId;
      delete mod.versions;
      delete mod.images;
      delete mod.description;
      delete mod._count;
      if (mod.latest_version) {
        mod.latest_version.downloads = mod.latest_version.downloads.length;
      }
      return mod;
    });
    const mod_count = await countMods(search, nsfw);
    const meta = {
      total: mod_count,
      next_page: (mods.length < number) ? null : page + 1,
      prev_page: (page - 1) < 1 ? null : page - 1,
      pages: Math.ceil(mod_count / number),
      page,
      number,
    }
    ctx.response.body = { mods, meta };
  },
  getMod: async (ctx) => {
    const { user_slug, mod_slug } = ctx.params;
    const mod = await getMod(mod_slug, user_slug);
    if (!mod) {
      ctx.response.status = 404;
      ctx.response.body = { message: 'Mod not found.' };
      return;
    }
    delete mod.id;
    delete mod.userId;
    delete mod.images;
    delete mod._count;
    delete mod.user.id;
    delete mod.user.email;
    delete mod.user.password;
    delete mod.user.createdAt;
    delete mod.user.updatedAt;
    if (mod.latest_version) {
      mod.latest_version.downloads = mod.latest_version.downloads.length;
    }
    ctx.response.body = mod;
  },
  getModsFromUser: async (ctx) => {
    const user_slug = ctx.params.user_slug;
    const mods = (await getModsFromUser(user_slug)).map((mod) => {
      delete mod.id;
      delete mod.userId;
      delete mod.versions;
      delete mod.images;
      delete mod._count;
      if (mod.latest_version) {
        mod.latest_version.downloads = mod.latest_version.downloads.length;
      }
      return mod;
    });
    const mod_count = await countModsFromUser(user_slug);
    ctx.response.body = { mods, mod_count };
  },
  uploadMod: async (ctx) => {
    const form = ctx.request.body;

    // Validate form
    if (!form.name) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod name provided.' };
      return;
    }
    if (!form.shortDescription) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod short description provided.' };
      return;
    }
    if (!form.description) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod description provided.' };
      return;
    }
    if (!form.version) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod version provided.' };
      return;
    }
    if (!semver.valid(form.version)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Invalid mod version provided.' };
      return;
    }

    // Validations
    try {
      form.name = validateModName(form.name);
      form.description = validateModDescription(form.description);
      form.shortDescription = validateModShortDescription(form.shortDescription);
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: error };
      return;
    }

    // Upload image thumbnail
    const thumbnail = ctx.request.files['modThumbnail']?.[0];

    if (!thumbnail) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod thumbnail provided.' };
      return;
    }

    const thumbnail_ext = thumbnail.originalname.split('.').pop();
    if (['png', 'jpg', 'jpeg', 'gif'].indexOf(thumbnail_ext) === -1) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod thumbnail must be a png, jpg, jpeg file.' };
      return;
    }
    const thumbnailSizeLimit = 8 * 1024 * 1024; // 8MB
    if (thumbnail.size > thumbnailSizeLimit) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod thumbnail size exceeds the limit of 8MB.' };
      return;
    }

    const img = await Image.decode(thumbnail.buffer);
    if (!ALLOWED_RESOLUTIONS.find((res) => res.width === img.width && res.height === img.height)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod thumbnail resolution must be 2560x1440 or 1080x608.' };
      return;
    }

    // Upload file
    const file = ctx.request.files['modFile']?.[0];

    if (!file) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod file provided.' };
      return;
    }
    if (!file) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod file is empty.' };
      return;
    }
    const ext = file.originalname.split('.').pop();
    if (ext !== 'zip' && ext !== 'dll') {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod file must be a zip or dll file.' };
      return;
    }
    const modFileSizeLimit = 10 * 1024 * 1024; // 10MB
    if (file.size > modFileSizeLimit) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod file size exceeds the limit of 10MB.' };
      return;
    }
    const slugName = slugify(form.name);
    const existingMod = await prisma.mod.findFirst({
      where: {
        OR: [
          { name: form.name },
          { slug: slugName },
        ]
      }
    });
    if (existingMod) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod already exists.' };
      return;
    }

    const mod = await prisma.mod.create({
      data: {
        name: form.name,
        slug: slugName,
        shortDescription: form.shortDescription,
        description: form.description,
        isNSFW: form.isNSFW === "true",
        isApproved: false,
        isFeatured: false,
        categoryId: parseInt(form.category_id),
        userId: ctx.state.user.id,
      }
    });

    let thumbnailName;
    try {
      thumbnailName = await uploadFile(thumbnail.buffer, `${slugify(form.name)}_thumbnail.${thumbnail_ext}`);
      if (!thumbnailName) throw thumbnailName;
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      ctx.response.status = 500;
      ctx.response.body = { message: 'An error occurred during thumbnail upload.' };
      return;
    }

    await prisma.modImage.create({
      data: {
        url: `${BASE_URL}/images/${thumbnailName}`,
        isPrimary: false,
        isThumbnail: true,
        mod: {
          connect: {
            id: mod.id,
          }
        }
      }
    });

    let fileName;
    try {
      fileName = await uploadFile(file.buffer, `${slugName}_${form.version}.${ext}`);
      if (!fileName) throw fileName;
    } catch (error) {
      console.error("Error uploading file:", error);
      ctx.response.status = 500;
      ctx.response.body = { message: 'An error occurred during file upload.' };
      return;
    }

    await prisma.modVersion.create({
      data: {
        version: form.version,
        changelog: "First release",
        downloadUrl: `${BASE_URL}/mods/${ctx.state.user.slug}/${slugName}/download/${form.version}`,
        isLatest: true,
        filename: fileName,
        mod: {
          connect: {
            id: mod.id,
          }
        }
      }
    });

    ctx.response.body = { status: true, slug: slugName, message: 'Mod uploaded successfully.' };
    return;
  },
  toggleFavorite: async (ctx) => {
    const { user_slug, mod_slug } = ctx.params;
    const mod = await getMod(mod_slug, user_slug);
    if (!mod) {
      ctx.response.status = 404;
      ctx.response.body = { message: 'Mod not found.' };
      return;
    }
    const favorite = await prisma.modFavorite.findFirst({
      where: {
        modId: mod.id,
        userId: ctx.state.user.id,
      }
    });
    if (favorite) {
      await prisma.modFavorite.delete({
        where: {
          id: favorite.id,
        }
      });
      ctx.response.body = { status: false, message: 'Mod removed from favorites.' };
      return;
    }
    await prisma.modFavorite.create({
      data: {
        modId: mod.id,
        userId: ctx.state.user.id,
      }
    });
    ctx.response.body = { status: true, message: 'Mod added to favorites.' };
    return;
  },
  checkVersion: async (ctx) => {
    const { user_slug, mod_slug } = ctx.params;
    const version = ctx.request.query?.version;
    const latestVersion = await prisma.modVersion.findFirst({
      where: {
        mod: {
          slug: mod_slug,
          user: {
            slug: user_slug,
          }
        },
        isLatest: true,
      },
      select: {
        version: true,
        changelog: true,
      }
    });
    if (!latestVersion) {
      ctx.response.status = 404;
      ctx.response.body = { message: 'Mod not found.' };
      return;
    }
    if (version) {
      if (semver.gt(latestVersion.version, version)) {
        ctx.response.body = {
          status: true,
          newVersionAvailable: true,
          message: 'New version available',
          version: latestVersion.version,
          changelog: latestVersion.changelog,
        };
      } else {
        ctx.response.body = {
          status: true,
          newVersionAvailable: false,
          message: 'No new version available',
          version: latestVersion.version,
          changelog: latestVersion.changelog,
        };
      }
      return;
    }
    ctx.response.body = {
      status: true,
      message: 'Latest version',
      version: latestVersion.version,
      changelog: latestVersion.changelog
    };
    return;
  },
  getFavoriteModsIds: async (ctx) => {
    const mods = (await prisma.modFavorite.findMany({
      where: {
        user: {
          slug: ctx.params.user_slug,
        },
      },
      select: {
        mod: {
          select: {
            slug: true,
            user: {
              select: {
                slug: true,
              }
            }
          }
        }
      },
    })).map((favorite) => ({slug: favorite.mod.slug, user_slug: favorite.mod.user.slug}));
    ctx.response.body = { mods };
  },
  updateMod: async (ctx) => {
    const form = ctx.request.body;

    const author_slug = ctx.params.user_slug;
    const mod_slug = ctx.params.mod_slug;

    const mod = await getMod(mod_slug, author_slug);
    if (!mod) {
      ctx.response.status = 404;
      ctx.response.body = { status: false, message: 'Mod not found.' };
      return;
    }
    if (mod.userId !== ctx.state.user.id) {
      ctx.response.status = 403;
      ctx.response.body = { status: false, message: 'You are not the author of this mod.' };
      return;
    }
    
    const { name, description, shortDescription, isNSFW } = form;
    const thumbnail = ctx.request.files['modThumbnail']?.[0];
    let thumbnail_ext;
    const inputData = {};

    if(thumbnail) {
      thumbnail_ext = thumbnail.originalname.split('.').pop();
      if (['png', 'jpg', 'jpeg', 'gif'].indexOf(thumbnail_ext) === -1) {
        ctx.response.status = 400;
        ctx.response.body = { message: 'Mod thumbnail must be a png, jpg, jpeg or gif file.' };
        return;
      }
      const thumbnailSizeLimit = 8 * 1024 * 1024; // 8MB
      if (thumbnail.size > thumbnailSizeLimit) {
        ctx.response.status = 400;
        ctx.response.body = { message: 'Mod thumbnail size exceeds the limit of 8MB.' };
        return;
      }
      const img = await Image.decode(thumbnail.buffer);
      if (!ALLOWED_RESOLUTIONS.find((res) => res.width === img.width && res.height === img.height)) {
        ctx.response.status = 400;
        ctx.response.body = { message: 'Mod thumbnail resolution must be 2560x1440 or 1080x608.' };
        return;
      }
    }

    try {
      if (name) {
        inputData['name'] = validateModName(name);
      }
      if (description) {
        inputData['description'] = validateModDescription(description);
      }
      if (shortDescription) {
        inputData['shortDescription'] = validateModShortDescription(shortDescription);
      }
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: error };
      return;
    }
    if (isNSFW !== undefined) {
      inputData['isNSFW'] = isNSFW === "true";
    }

    await prisma.mod.update({
      where: {
        id: mod.id,
      },
      data: inputData,
    });
    if (thumbnail) {
      await prisma.modImage.deleteMany({
        where: {
          modId: mod.id,
          isThumbnail: true,
        }
      });
      let thumbnailName;
      try {
        let timestamp = new Date().getTime();
        thumbnailName = await uploadFile(thumbnail.buffer, `${timestamp}_${mod.slug}_thumbnail.${thumbnail_ext}`);
        if (!thumbnailName) throw thumbnailName;
      } catch (error) {
        console.error("Error uploading thumbnail:", error);
        ctx.response.status = 500;
        ctx.response.body = { status: false, message: error };
        return;
      }
      await prisma.modImage.create({
        data: {
          url: `${BASE_URL}/images/${thumbnailName}`,
          isPrimary: false,
          isThumbnail: true,
          mod: {
            connect: {
              id: mod.id,
            }
          }
        }
      });
    }

    ctx.response.body = { status: true, message: 'Mod updated successfully.' };
  },
  releaseVersion: async (ctx) => {
    const form = ctx.request.body;

    const author_slug = ctx.params.user_slug;
    const mod_slug = ctx.params.mod_slug;

    const mod = await getMod(mod_slug, author_slug);
    if (!mod) {
      ctx.response.status = 404;
      ctx.response.body = { status: false, message: 'Mod not found.' };
      return;
    }
    if (mod.userId !== ctx.state.user.id) {
      ctx.response.status = 403;
      ctx.response.body = { status: false, message: 'You are not the author of this mod.' };
      return;
    }
    
    const version = form.version;
    const changelog = form.changelog;

    if (!version) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'No version provided.' };
      return;
    }
    if (!semver.valid(version)) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'Invalid version provided.' };
      return;
    }
    if (!changelog) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'No changelog provided.' };
      return;
    }
    if(changelog.length < 10) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'Changelog must be at least 10 characters long.' };
      return;
    }
    if(changelog.length > 200) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'Changelog must be less than 200 characters long.' };
      return;
    }

    const file = ctx.request.files['modFile']?.[0];
    if (!file) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'No mod file provided.' };
      return;
    }
    const ext = file.originalname.split('.').pop();
    if (ext !== 'zip' && ext !== 'dll') {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'Mod file must be a zip or dll file.' };
      return;
    }

    const existingVersion = await prisma.modVersion.findFirst({
      where: {
        modId: mod.id,
        version,
      }
    });
    if (existingVersion) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'Version already exists.' };
      return;
    }

    const latestVersion = await prisma.modVersion.findFirst({
      where: {
        modId: mod.id,
        isLatest: true,
      }
    });
    
    if (latestVersion && !semver.gt(version, latestVersion.version)) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'Version must be greater than latest version.' };
      return;
    }

    let fileName;

    try {
      fileName = await uploadFile(file.buffer, `${mod.slug}_${version}.${ext}`);
      if (!fileName) throw fileName;
    } catch (error) {
      console.error("Error uploading file:", error);
      ctx.response.status = 500;
      ctx.response.body = { message: 'An error occurred during file upload.' };
      return;
    }

    await prisma.modVersion.updateMany({
      where: {
        modId: mod.id,
      },
      data: {
        isLatest: false,
      }
    });

    const v = await prisma.modVersion.create({
      data: {
        version,
        changelog,
        downloadUrl: `${BASE_URL}/mods/${ctx.state.user.slug}/${mod.slug}/download/${version}`,
        isLatest: true,
        filename: fileName,
        mod: {
          connect: {
            id: mod.id,
          }
        }
      }
    });

    await prisma.mod.update({
      where: {
        id: mod.id,
      },
      data: {
        updatedAt: new Date(),
      }
    });

    ctx.response.body = { status: true, message: 'Mod version released successfully.' };
  },
}
