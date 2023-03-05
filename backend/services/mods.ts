import { prisma } from "./prisma.ts";
import { Mod, ModImage, ModVersion, User } from "../../generated/client/deno/index.d.ts";

async function decorateMod(mod: Mod & {
    images: ModImage[];
    user: User | null;
    versions: ModVersion[];
    _count: {
        favorites: number;
    };
}) {
    let thumbnail_url = mod.images.find((image) => image.isThumbnail)?.url;
    if (!thumbnail_url)
        thumbnail_url = mod.images[0]?.url;
    if (!thumbnail_url)
        thumbnail_url = "https://via.placeholder.com/150";
    
    let primary_image_url = mod.images.find((image) => image.isPrimary)?.url;
    if (!primary_image_url)
        primary_image_url = mod.images[0]?.url;
    if (!primary_image_url)
        primary_image_url = "https://via.placeholder.com/150";

    const latest_version = mod.versions.find((version) => version.isLatest);

    const downloads = await prisma.modDownload.count({
        where: {
            modVersionId: {
                in: mod.versions.map((version) => version.id),
            }
        }
    });

    return {
        ...mod,
        thumbnail_url,
        primary_image_url,
        latest_version,
        downloads,
    }
}

const modInclude = {
    images: true,
    user: true,
    versions: true,
    _count: {
        select: {
            favorites: true,
        }
    }
};

export async function getMods() {
    const mods = await prisma.mod.findMany({
        include: modInclude,
    });
    const arr = await Promise.all(mods.map(decorateMod));
    return arr;
}

export async function getMod(mod_slug: string, author_slug: string) {
    const mod = await prisma.mod.findFirst({
        where: {
            slug: mod_slug,
            user: {
                slug: author_slug,
            }
        },
        include: modInclude,
    });
    return await decorateMod(mod);
}

export async function getModDownloadVersion(mod_slug: string, author_slug: string, version: string) {
    const modVersion = await prisma.modVersion.findFirst({
        where: {
            version: version,
            mod: {
                slug: mod_slug,
                user: {
                    slug: author_slug,
                }
            }
        }
    });
    return modVersion?.downloadUrl;
}