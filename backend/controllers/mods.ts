import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { multiParser } from 'https://deno.land/x/multiparser/mod.ts';
import { slug } from "https://deno.land/x/slug/mod.ts";
import * as semver from "https://deno.land/x/semver/mod.ts";
import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts"

import { getMod, getMods, countMods, getModsFromUser, countModsFromUser } from "../services/mods.ts";
import { uploadFile } from "../util/drive.ts";
import { prisma } from "../services/prisma.ts";

const ALLOWED_RESOLUTIONS = [
  { width: 2560, height: 1440 },
  { width: 1080, height: 608 }
];

const BASE_URL = Deno.env.get("BASE_URL") + "";

function validateModName(modName) {
  let name = modName.trim();
  if (name.length < 4) {
    throw "Mod name must be at least 3 characters long.";
  }
  if (name.length > 24) {
    throw "Mod name must be less than 50 characters long.";
  }
  if (!/^[a-zA-Z0-9 -_]+$/.test(name)) {
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
  getMods: async (ctx: Context) => {
    const page = parseInt(ctx.request.url.searchParams.get("page") || "1");
    const number = parseInt(ctx.request.url.searchParams.get("number") || "10");
    const search = (ctx.request.url.searchParams.get("search") || "").trim();
    const nsfw = ctx.request.url.searchParams.get("nsfw") === "true";
    
    const mods = (await getMods(page, number, search, nsfw)).map((mod) => {
      delete mod.id;
      delete mod.userId;
      delete mod.versions;
      delete mod.images;
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
  getModsFromUser: async (ctx: Context) => {
    const user_slug = ctx.params.user_slug;
    const mods = (await getModsFromUser(user_slug)).map((mod) => {
      delete mod.id;
      delete mod.userId;
      delete mod.versions;
      delete mod.images;
      return mod;
    });
    const mod_count = await countModsFromUser(user_slug);
    ctx.response.body = { mods, mod_count };
  },
  uploadMod: async (ctx: Context) => {
    const form = await multiParser(ctx.request.originalRequest.request);

    // Validate form
    if (!form.fields) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No form fields provided.' };
      return;
    }
    const fields = form.fields;
    if (!fields.name) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod name provided.' };
      return;
    }
    if (!fields.shortDescription) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod short description provided.' };
      return;
    }
    if (!fields.description) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod description provided.' };
      return;
    }
    if (!fields.version) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod version provided.' };
      return;
    }
    if (!semver.valid(fields.version)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Invalid mod version provided.' };
      return;
    }

    // Validations
    try {
      fields.name = validateModName(fields.name);
      fields.description = validateModDescription(fields.description);
      fields.shortDescription = validateModShortDescription(fields.shortDescription);
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: error };
      return;
    }

    // Upload image thumbnail
    const thumbnail = form.files && form.files['modThumbnail'];

    if (!thumbnail) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod thumbnail provided.' };
      return;
    }
    if (!thumbnail.content) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod thumbnail is empty.' };
      return;
    }
    const thumbnail_ext = thumbnail.filename.split('.').pop();
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

    const img = await Image.decode(thumbnail.content);
    if (!ALLOWED_RESOLUTIONS.find((res) => res.width === img.width && res.height === img.height)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod thumbnail resolution must be 2560x1440 or 1080x608.' };
      return;
    }

    // Upload file
    const file = form.files && form.files['modFile'];

    if (!file) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No mod file provided.' };
      return;
    }
    if (!file.content) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Mod file is empty.' };
      return;
    }
    const ext = file.filename.split('.').pop();
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
    const slugName = slug(fields.name);
    const existingMod = await prisma.mod.findFirst({
      where: {
        OR: [
          { name: fields.name },
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
        name: fields.name,
        slug: slugName,
        shortDescription: fields.shortDescription,
        description: fields.description,
        isNSFW: fields.isNSFW === "true",
        isApproved: false,
        isFeatured: false,
        categoryId: parseInt(fields.category_id),
        userId: ctx.state.user.id,
      }
    });

    let thumbnailName;
    try {
      thumbnailName = await uploadFile(thumbnail.content, `${slug(fields.name)}_thumbnail.${thumbnail_ext}`);
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
      fileName = await uploadFile(file.content, `${slugName}_${fields.version}.${ext}`);
      if (!fileName) throw fileName;
    } catch (error) {
      console.error("Error uploading file:", error);
      ctx.response.status = 500;
      ctx.response.body = { message: 'An error occurred during file upload.' };
      return;
    }

    await prisma.modVersion.create({
      data: {
        version: fields.version,
        changelog: "First release",
        downloadUrl: `${BASE_URL}/mods/${ctx.state.user.slug}/${slugName}/download/${fields.version}`,
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
  toggleFavorite: async (ctx: Context) => {
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
  checkVersion: async (ctx: Context) => {
    const { user_slug, mod_slug } = ctx.params;
    const version = ctx.request.url.searchParams.get("version");
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
  getFavoriteModsIds: async (ctx: Context) => {
    const ids = (await prisma.modFavorite.findMany({
      where: {
        userId: ctx.params.user_slug,
      }
    })).map((favorite) => favorite.modId);
    ctx.response.body = { ids };
  },
  updateMod: async (ctx: Context) => {
    const form = await multiParser(ctx.request.originalRequest.request);

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
    
    const { name, description, shortDescription, isNSFW } = form?.fields;
    const thumbnail = form.files && form.files['modThumbnail'];
    let thumbnail_ext;
    const inputData = {};

    if(thumbnail) {
      thumbnail_ext = thumbnail.filename.split('.').pop();
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
      const img = await Image.decode(thumbnail.content);
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
        thumbnailName = await uploadFile(thumbnail.content, `${timestamp}_${mod.slug}_thumbnail.${thumbnail_ext}`);
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
  releaseVersion: async (ctx: Context) => {
    const form = await multiParser(ctx.request.originalRequest.request);

    if (!form.fields) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'No form fields provided.' };
      return;
    }

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
    
    const version = form.fields.version;
    const changelog = form.fields.changelog;

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

    const file = form.files && form.files['modFile'];
    if (!file) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'No mod file provided.' };
      return;
    }
    if (!file.content) {
      ctx.response.status = 400;
      ctx.response.body = { status: false, message: 'Mod file is empty.' };
      return; 
    }
    const ext = file.filename.split('.').pop();
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
      fileName = await uploadFile(file.content, `${mod.slug}_${version}.${ext}`);
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
