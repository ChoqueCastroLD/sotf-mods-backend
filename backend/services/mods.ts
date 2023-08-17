import { prisma } from "./prisma.ts";
import { Mod, ModImage, ModVersion, User } from "../../generated/client/deno/index.d.ts";

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
        ?? mod.images?.[0]?.url
        ?? "https://via.placeholder.com/1080x608/222/222";
        
    const primary_image_url = mod?.images
        ?.find((image) => image.isPrimary)?.url
        ?? mod.images?.[0]?.url
        ?? "https://via.placeholder.com/1080x608/222/222";

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
export async function getMods(page: number, limit: number, search: string, nsfw: boolean) {
    const offset = (page - 1) * limit;

    const where = {};

    if (search) {
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                }
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                }
            },
            {
                user: {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    }
                }
            },
        ];
    }
    if (!nsfw) {
        where.isNSFW = false;
    }
    const mods = await prisma.mod.findMany({
        where: {
            isApproved: true,
            ...where,
        },
        include: {
            images: {
                select: {
                    isPrimary: true,
                    isThumbnail: true,
                    url: true,
                }
            },
            user: {
                select: {
                    name: true,
                    slug: true,
                    image_url: true,
                }
            },
            category: {
                select: {
                    name: true,
                    slug: true,
                }
            },
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
        },
        skip: offset,
        take: limit,
    });

    const arr = await Promise.all(mods.map(decorateMod));

    return arr;
}

export async function getModsFromUser(user_slug: string) {
    const mods = await prisma.mod.findMany({
        where: {
            user: {
                slug: user_slug,
            }
        },
        include: {
            images: {
                select: {
                    isPrimary: true,
                    isThumbnail: true,
                    url: true,
                }
            },
            user: {
                select: {
                    name: true,
                    slug: true,
                    image_url: true,
                }
            },
            category: {
                select: {
                    name: true,
                    slug: true,
                }
            },
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
        },
    });

    const arr = await Promise.all(mods.map(decorateMod));

    return arr;
}

export async function countModsFromUser(user_slug: string) {
    const mods = await prisma.mod.count({
        where: {
            user: {
                slug: user_slug,
            }
        },
    });

    return mods;
}

export async function countMods(search: string, nsfw: boolean): Promise<number> {
    const where = {};

    if (search) {
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                }
            },
            {
                shortDescription: {
                    contains: search,
                    mode: "insensitive",
                }
            },
            {
                user: {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    }
                }
            },
        ];
    }

    if (!nsfw) {
        where.isNSFW = false;
    }
    const mods = await prisma.mod.count({
        where: {
            isApproved: true,
            ...where,
        },
    });

    return mods;
}

export async function getMod(mod_slug: string, author_slug: string, userWatching?: any) {
    let favoritesInclude = {};
    if (userWatching) {
        favoritesInclude = {
            favorites: {
                where: {
                    user: {
                        slug: userWatching.slug,
                    }
                },
                select: {
                    userId: true,
                }
            }
        }
    }

    const mod = await prisma.mod.findFirst({
        where: {
            slug: mod_slug,
            user: {
                slug: author_slug,
            }
        },
        include: {
            ...favoritesInclude,
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
            category: {
                select: {
                    name: true,
                    slug: true,
                }
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

    return decoratedMod;
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