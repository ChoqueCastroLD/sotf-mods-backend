const modsDiscoverContainer = document.querySelector('#mods-discover-container');
const modsDiscoverOrientation = document.querySelector('#mods-discover-orientation');
const modsDiscoverSearch = document.querySelector('#mods-discover-search');
const modsDiscoverNSFW = document.querySelector('#mods-discover-nsfw');
const modsDiscoverPagination = document.querySelector('#mods-discover-pagination');
const modsDiscoverPaginationUP = document.querySelector('#mods-discover-pagination-up');

let forceVerticalMod = false;
let debounceDict = {};
let lastResponse = { mods: [], meta: {} };

function addEventListenerDebounce(name, element, event, callback) {
    element.addEventListener(event, () => {
        clearTimeout(debounceDict[name]);
        debounceDict[name] = setTimeout(() => {
            callback();
        }, 300);
    });
}

async function getMods(page) {
    const search = modsDiscoverSearch.value.trim();
    let url = `/api/mods?`;
    if (modsDiscoverNSFW.checked) url += '&nsfw=true';
    if (search.length > 0) url += `&search=${search}`;
    if (page) {
        url += `&page=${page}`;
    }
    const response = await fetch(url);
    const { mods, meta } = await response.json();
    lastResponse = { mods, meta };
    return { mods, meta };
}

function getModTemplate(mod) {
    mod.description = sanitizeText(mod.description.replace(/\n/g, " "));
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

function buildModsPaginationPages(parentElement, {total, page, number, next_page, prev_page, pages}) {
    parentElement.innerHTML = '';
    const pagination = document.createElement('div');
    pagination.classList.add('join');
    for (let i = 1; i <= pages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('join-item', 'btn', 'btn-sm');
        if (i == page) {
            pageBtn.disabled = true;
            pageBtn.classList.add('btn-disabled');
        } else {
            addEventListenerDebounce(`page-${i}`, pageBtn, 'click', () => {
                loadMods(i);
                pageBtn.disabled = true;
                pageBtn.classList.add('btn-disabled');
            });
        }
        pageBtn.innerText = i;
        pagination.appendChild(pageBtn);
    }
    parentElement.appendChild(pagination);
}

async function renderMods(mods, meta) {
    const horizontalMode = modsDiscoverOrientation.checked || forceVerticalMod;
    modsDiscoverContainer.innerHTML = '';
    for (const mod of mods) {
        const modElement = document.createElement('div');
        modElement.classList.add('card', 'shadow-xl', 'sm:mb-2', 'mb-4');
        if (horizontalMode) {
            modElement.classList.add('card-compact', 'w-96', 'bg-base-100', 'mod-card-horizontal');
        } else {
            modElement.classList.add('card-side', 'bg-base-100', 'mod-card');
        }
        modElement.innerHTML = getModTemplate(mod);
        modsDiscoverContainer.appendChild(modElement);
    }
    if (mods.length == 0) {
        modsDiscoverContainer.innerHTML = '<h1 class="text-center">No mods found</h1>';
    }
    buildModsPaginationPages(modsDiscoverPagination, meta);
    buildModsPaginationPages(modsDiscoverPaginationUP, meta);
}

async function loadMods(page) {
    modsDiscoverContainer.innerHTML = '<span class="loading loading-infinity loading-lg text-success center"></span>';
    modsDiscoverPagination.innerHTML = '';
    modsDiscoverPaginationUP.innerHTML = '';
    try {
        const { mods, meta } = await getMods(page);
        renderMods(mods, meta);
    } catch (error) {
        console.error(error);
        modsDiscoverPagination.innerHTML = '';
        modsDiscoverPaginationUP.innerHTML = '';
        modsDiscoverContainer.innerHTML = '<h1 class="text-center">Something went wrong :(</h1>';
    }
}

async function main() {
    await loadMods();
    addEventListenerDebounce('search', modsDiscoverSearch, 'input', () => {
        loadMods();
    });
    addEventListenerDebounce('nsfw', modsDiscoverNSFW, 'change', () => {
        loadMods();
    });
    addEventListenerDebounce('orientation', modsDiscoverOrientation, 'change', () => {
        renderMods(lastResponse.mods, lastResponse.meta);
    });
    function checkWindowSize() {
        if (!forceVerticalMod && window.innerWidth < 600) {
            forceVerticalMod = true;
            loadMods();
        } else if (forceVerticalMod && window.innerWidth >= 600) {
            forceVerticalMod = false;
        }
    }
    addEventListenerDebounce('resize', window, 'resize', checkWindowSize);
    checkWindowSize();
}

main();
