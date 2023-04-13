import { prisma } from "./prisma.ts";
import { Mod, ModImage, ModVersion, User } from "../../generated/client/deno/index.d.ts";
import { getCache, setCache } from "../util/cache.ts";

function timeAgo(date: Date) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = (new Date()).getTime() - date.getTime();
  
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
}

function decorateMod(mod: Mod & {
    user: User | null;
    versions?: (ModVersion & {
        downloads: {
            ip: string;
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
    const thumbnail_url = mod?.images
        ?.find((image) => image.isThumbnail)?.url
        ?? mod.images?.[0].url
        ?? "https://via.placeholder.com/512";
        
    const primary_image_url = mod?.images
        ?.find((image) => image.isPrimary)?.url
        ?? mod.images?.[0].url
        ?? "https://via.placeholder.com/1024";

    const latest_version = mod.versions?.find((version) => version.isLatest);

    const downloads_arr = mod.versions?.flatMap(version => version.downloads.map(download => download.ip)) ?? [];

    const downloads = [...new Set(downloads_arr)].length;

    const total_downloads = downloads_arr.length;

    let time_ago = timeAgo(mod.updatedAt);
    if (latest_version && (new Date(latest_version.createdAt)).getTime() > (new Date(mod.updatedAt)).getTime()) {
        time_ago = timeAgo(latest_version.createdAt);
    }

    return {
        ...mod,
        thumbnail_url,
        primary_image_url,
        latest_version,
        downloads,
        total_downloads,
        time_ago,
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
                orderBy: {
                    version: "asc",
                },
                include: {
                    downloads: {
                        select: {
                            ip: true,
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

export async function getModsFromUser(user_slug: string) {
    const cachedMods = await getCache("getModsFromUser-" + user_slug);
    if (cachedMods) return cachedMods;

    const mods = await prisma.mod.findMany({
        where: {
            user: {
                slug: user_slug,
            }
        },
        include: {
            images: true,
            user: true,
            versions: {
                orderBy: {
                    version: "asc",
                },
                include: {
                    downloads: {
                        select: {
                            ip: true,
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

    setCache("getModsFromUser-" + user_slug, arr);
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
                orderBy: {
                    version: "desc",
                },
                include: {
                    downloads: {
                        select: {
                            ip: true,
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