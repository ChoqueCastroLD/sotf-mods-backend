export const cache = new Map();

export function getCache(key: string) {
    if (cache.has(key)) {
        const cached = cache.get(key);
        if (cached.expires > Date.now()) {
            return cached.value;
        }
    }
    return null;
}

export function setCache(key: string, value: unknown) {
    cache.set(key, {
        value,
        expires: Date.now() + 1000 * 60 * 5, // 5 minutes
    });
}

export function clearCache(key: string) {
    cache.delete(key);
}
