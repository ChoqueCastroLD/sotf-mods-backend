
import { prisma } from "./prisma.ts";
import { Mod, ModImage, ModVersion, User } from "../../generated/client/deno/index.d.ts";

export async function decorateMod(mod: Mod & {
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

    console.log('getting latest version');
    const latest_version = mod.versions.find((version) => version.isLatest);
    console.log('getting downloads');
    const downloads = await prisma.modDownload.count({
        where: {
            modVersionId: {
                in: mod.versions.map((version) => version.id),
            }
        }
    });
    console.log('downloads: '+downloads);

    return {
        ...mod,
        thumbnail_url,
        primary_image_url,
        latest_version,
        downloads,
    }
}

export async function getMods() {
    console.log('getting all mods');
    const mods = await prisma.mod.findMany({
        include: {
            images: true,
            user: true,
            versions: true,
            _count: {
                select: {
                    favorites: true,
                }
            }
        },
    });
    const arr = [];
    console.log('processing all mods');
    for (const mod of mods) {
        console.log('processing mod');
        arr.push(await decorateMod(mod));
        console.log('processing mod done');
    }
    return arr;
}