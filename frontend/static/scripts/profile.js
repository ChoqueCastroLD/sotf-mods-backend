const modsDiscoverContainer = document.querySelector('#mods-discover-container');
const userProfile = JSON.parse(document.querySelector('#profile-info').dataset.user);

async function getMods() {
    let url = `/api/mods/user/${userProfile.slug}`;
    const response = await fetch(url);
    const { mods, meta } = await response.json();
    return { mods, meta };
}

function getModTemplate(mod) {
    return `<figure><img src="${mod.thumbnail_url}" alt="${mod.name}"/></figure>
    <div class="card-body">
        <div class="mod-card-badges">
            <a href="/mods?category=${mod.category.slug}">
                <div class="badge badge-ghost">${mod.category.name}</div>
            </a>
            ${mod.isNSFW ? `<div class="badge badge-secondary badge-outline">NSFW</div>` : ''}
            ${mod.isFeatured ? `<div class="badge badge-accent">Featured</div>` : ''}
        </div>
        <h2 class="card-title w-full overflow-hidden">${mod.name}</h2>
        <p>by <a class="text-success" href="/profile/${mod.user.slug}">${mod.user.name}</a></p>
        <p class="text-justify text-wrap-anywhere">${mod.description.substring(0, 60)}${mod.description.length > 60 ? "..." : ""}</p>
        <div class="card-actions justify-end">
            <a class="btn btn-outline btn-success btn-sm" href="/mods/${mod.user.slug}/${mod.slug}">Download</a>
        </div>
        <div class="card-actions justify-end">
            <span class="stat-desc text-success">↗︎ ${mod.downloads} downloads</span>
            <span class="stat-desc text-secondary ml-2">♥ ${mod._count.favorites} follows</span>
            <span class="stat-desc ml-2">⏱ ${mod.time_ago}</span>
        </div>
    </div>`;
}

async function renderMods(mods, meta) {
    modsDiscoverContainer.innerHTML = '';
    for (const mod of mods) {
        const modElement = document.createElement('div');
        modElement.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'mod-card');
        modElement.innerHTML = getModTemplate(mod);
        modsDiscoverContainer.appendChild(modElement);
    }
    if (mods.length == 0) {
        modsDiscoverContainer.innerHTML = '<h1 class="text-center">No mods found</h1>';
    }
}

async function loadMods() {
    modsDiscoverContainer.innerHTML = '<span class="loading loading-infinity loading-lg text-success center"></span>';
    try {
        const { mods, meta } = await getMods();
        renderMods(mods, meta);
    } catch (error) {
        console.error(error);
        modsDiscoverContainer.innerHTML = '<h1 class="text-center">Something went wrong :(</h1>';
    }
}


async function main() {
    await loadMods();
}

main();
