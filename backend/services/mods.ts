import { prisma } from "./prisma.ts";
import { Mod, ModImage, ModVersion, User } from "../../generated/client/deno/index.d.ts";


function decorateMod(mod: Mod & {
    user: User | null;
    versions?: (ModVersion & {
        downloads: {
            id: number;
        }[];
    })[];
    images: ModImage[];
    _count: {
        favorites: number;
    };
}) {
    const thumbnail_url = mod.images
        ?.find((image) => image.isThumbnail)?.url
        ?? mod.images?.[0].url
        ?? "https://via.placeholder.com/512";
        
    const primary_image_url = mod.images
        ?.find((image) => image.isPrimary)?.url
        ?? mod.images?.[0].url
        ?? "https://via.placeholder.com/1024";

    const latest_version = mod.versions?.find((version) => version.isLatest);

    const downloads = mod.versions?.reduce((acc, version) => {
        return acc + version.downloads.length;
    }, 0) ?? 0;

    return {
        ...mod,
        thumbnail_url,
        primary_image_url,
        latest_version,
        downloads,
    }
}

export async function getMods() {
    const mods = await prisma.mod.findMany({
        include: {
            images: true,
            user: true,
            versions: {
                include: {
                    downloads: {
                        distinct: "ip",
                        select: {
                            id: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    favorites: true,
                }
            }
        },
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
        include: {
            images: true,
            user: true,
            versions: {
                include: {
                    downloads: {
                        distinct: "ip",
                        select: {
                            id: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    favorites: true,
                }
            }
        },
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
    return modVersion;
}

export async function addDownload(modVersionId: number, ip: string, userAgent: string) {
    return await prisma.modDownload.create({
        data: {
            modVersionId: modVersionId,
            ip,
            userAgent,
        }
    });
}