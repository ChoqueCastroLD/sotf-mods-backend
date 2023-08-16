const modListDemo = document.querySelector('#mod-list-demo');
const modsDiscoverOrientation = document.querySelector('#mods-discover-orientation');

const btnSubmitMod = document.querySelector('#btn-submit-mod');
const modName = document.querySelector('#mod-name');
const modDescription = document.querySelector('#mod-description');
const modCategory = document.querySelector('#mod-category');
const modVersion = document.querySelector('#mod-version');
const modIsNSFW = document.querySelector('#mod-isNSFW');
const modFile = document.querySelector('#mod-file');
const modThumbnail = document.querySelector('#mod-thumbnail');


function getModTemplate(mod) {
    if (!mod.description) mod.description = "This is a description of the mod.";
    mod.description = mod.description.replace(/\n/g, " ");
    return `<figure><img src="${mod.thumbnail_url || "https://cdn.discordapp.com/attachments/1078656518133661737/1140334396172402748/example_image.png"}" alt="${mod.name || "Mod Name"}"/></figure>
    <div class="card-body">
        <div class="mod-card-badges">
            <a href="#!">
                <div class="badge badge-ghost">${parseInt(modCategory.value) ? modCategory.selectedOptions[0]?.innerText : "Category"}</div>
            </a>
            ${mod.isNSFW ? `<div class="badge badge-secondary badge-outline">NSFW</div>` : ''}
        </div>
        <h2 class="card-title w-full overflow-hidden">${mod.name || "Mod Name"}</h2>
        <p>by <a href="#!">${user.name}</a></p>
        <p class="text-justify text-wrap-anywhere">${mod.description.substring(0, 60)}${mod.description.length > 60 ? "..." : ""}</p>
        <div class="card-actions justify-end">
            <a class="btn btn-outline btn-success btn-sm" href="#!">Download</a>
        </div>
        <div class="card-actions justify-end">
            <span class="stat-desc text-success">↗︎ 99 downloads</span>
            <span class="stat-desc text-secondary ml-2">♥ 99 follows</span>
            <span class="stat-desc ml-2">⏱ just released</span>
        </div>
    </div>`;
}

async function renderModItem() {
    const mod = getMod();
    const horizontalMode = modsDiscoverOrientation.checked;
    modListDemo.innerHTML = '';
    const modElement = document.createElement('div');
    if (horizontalMode) {
        modElement.classList.add('card', 'card-compact', 'w-96', 'bg-base-100', 'shadow-xl', 'mod-card-horizontal');
    } else {
        modElement.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'mod-card');
    }
    modElement.innerHTML = getModTemplate(mod);
    modListDemo.appendChild(modElement);
}

function getMod() {
    return {
        "name": modName.value.trim(),
        "description": modDescription.value.trim(),
        "thumbnail_url": modThumbnail.files[0] ? URL.createObjectURL(modThumbnail.files[0]) : null,
        "isNSFW": modIsNSFW.checked,
        "category_id": parseInt(modCategory.value) || null,
        "version": modVersion.value.trim(),
    }
}

function isVersionValid(version) {
    const regex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    return regex.test(version);
}

function validateMod(mod) {
    if (!mod.name) throw "Mod name is required!";
    if (mod.name.length < 3) throw "Mod name must be at least 3 characters long!";
    if (mod.name.length > 30) throw "Mod name must be less than 50 characters!";
    if (!mod.description) throw "Mod description is required!";
    if (mod.description.length < 10) throw "Mod description must be at least 10 characters long!";
    if (mod.description.length > 1000) throw "Mod description must be less than 1000 characters!";
    if (!mod.category_id) throw "Mod category is required!";
    if (isNaN(mod.category_id)) throw "Mod category is not valid!";
    if (!mod.version) throw "Mod version is required!";
    if (!isVersionValid(mod.version)) throw "Mod version is not valid! (must follow format x.x.x)";
    if (!modFile.files[0]) throw "Mod file is required!";
    if (!modFile.files[0].name.endsWith('.zip') && !modFile.files[0].name.endsWith('.dll')) throw "Mod file must be a .zip or .dll file!";
    if (modFile.files[0].size > 10000000) throw "Mod file must be less than 100MB!";
    if (!modThumbnail.files[0]) throw "Mod thumbnail is required!";
    if (!['.zip', '.png', '.jpg', '.gif'].includes(modThumbnail.files[0].name.substring(modThumbnail.files[0].name.lastIndexOf('.')))) throw "Mod thumbnail must be a .png, .jpg, or .gif file!";
    if (modThumbnail.files[0].size > 8000000) throw "Mod thumbnail must be less than 8MB!";
    return true;
}

async function uploadMod() {
    showLoadingScreen();
    btnSubmitMod.classList.add('btn-disabled');
    btnSubmitMod.disabled = true;
    try {
        const mod = getMod();
        console.log(mod);

        validateMod(mod);

        const formData = new FormData();

        formData.append('name', mod.name);
        formData.append('description', mod.description);
        formData.append('isNSFW', mod.isNSFW);
        formData.append('category_id', mod.category_id);
        formData.append('version', mod.version);
        formData.append('modFile', modFile.files[0]);
        formData.append('modThumbnail', modThumbnail.files[0]);

        const res = await fetch('/api/mods/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            body: formData,
        });
        const result = await res.json();
        if(result && result.status) {
            window.location.href = `/profile/${user.slug}?mod-uploaded=true`;
            return;
        }
        throw result;
    } catch (error) {
        console.log(error);
        showError(error);
    } finally {
        hideLoadingScreen();
        btnSubmitMod.classList.remove('btn-disabled');
        btnSubmitMod.disabled = false;
    }
}

async function main() {
    await renderModItem();
    modsDiscoverOrientation.addEventListener('change', renderModItem);
    modName.addEventListener('input', renderModItem);
    modDescription.addEventListener('input', renderModItem);
    modCategory.addEventListener('change', renderModItem);
    modIsNSFW.addEventListener('change', renderModItem);
    modThumbnail.addEventListener('change', renderModItem);

    btnSubmitMod.addEventListener('click', evt => {
        evt.preventDefault();
        uploadMod();
    });
}

main();