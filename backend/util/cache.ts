export const cache = new Map();

export function getCache(key: string) {
    if (!cache.has(key)) 
        return null;

    const cached = cache.get(key);

    if (cached.expires < Date.now())
        return null;

    console.log("Getting from cache " + key);
    return cached.value;
}

export function setCache(key: string, value: unknown, minutes_to_expire = 5) {
    if(!value) return;

    console.log("Setting cache for " + key);
    cache.set(key, {
        value,
        expires: Date.now() + (1000 * 60 * minutes_to_expire),
    });
}

export function clearCache(key: string) {
    cache.delete(key);
}
