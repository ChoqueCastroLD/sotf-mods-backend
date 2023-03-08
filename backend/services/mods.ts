import { prisma } from "./prisma.ts";
import { Mod, ModImage, ModVersion, User } from "../../generated/client/deno/index.d.ts";
import { getCache, setCache } from "../util/cache.ts";

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
    if (!mod) {
        return mod;
    }
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
    const cachedMods = await getCache("getMods");
    if (cachedMods) return cachedMods;

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
        orderBy: {
            updatedAt: "desc",
        }
    });
    const arr = await Promise.all(mods.map(decorateMod));

    setCache("getMods", arr);
    return arr;
}

export async function getMod(mod_slug: string, author_slug: string) {
    const cachedMods = await getCache("getMod-" + mod_slug + "-" + author_slug);
    if (cachedMods) return cachedMods;

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

    if (!mod) {
        return mod;
    }

    const decoratedMod = await decorateMod(mod);

    setCache("getMod-" + mod_slug + "-" + author_slug, decoratedMod);
    return decoratedMod;
}

export async function getModDownloadVersion(mod_slug: string, author_slug: string, version: string) {
    const cachedModDownloadVersion = await getCache("getModDownloadVersion-" + mod_slug + "-" + author_slug + "-" + version);
    if (cachedModDownloadVersion) return cachedModDownloadVersion;

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

    setCache("getModDownloadVersion-" + mod_slug + "-" + author_slug + "-" + version, modVersion, 30);
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