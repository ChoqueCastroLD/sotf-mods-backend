const btnOneClickInstall = document.getElementById('btnOneClickInstall');
const modalOneClickInstall = document.getElementById('modalOneClickInstall');
const updateModBtn = document.getElementById('updateModBtn');
const releaseVersionBtn = document.getElementById('releaseVersionBtn');
const modThumbnail = document.querySelector('#mod-thumbnail');

const converter = new showdown.Converter();

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('updated')) {
    window.history.replaceState({}, document.title, window.location.pathname);
    showSuccess("Congratulations! You have successfully updated your mod");
}
if (urlParams.has('released')) {
    window.history.replaceState({}, document.title, window.location.pathname);
    showSuccess("Congratulations! You have successfully released your mod");
}

window.toggleFavorite = function (elem, author, slug) {
    elem.disabled = true;
    fetch(`/api/favorite/${author}/${slug}`, {
        headers: {
            'Authorization': 'Bearer ' + user.token
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    }).then((data) => {
        if (data.status) {
            document.getElementById("modFavorite:" + slug + ":off").classList.add("hidden");
            document.getElementById("modFavorite:" + slug + ":on").classList.remove("hidden");
        } else {
            document.getElementById("modFavorite:" + slug + ":off").classList.remove("hidden");
            document.getElementById("modFavorite:" + slug + ":on").classList.add("hidden");
        }
    }).catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    }).finally(() => {
        elem.disabled = false;
    });
}

function renderDescriptionPreview() {
    const description = document.getElementById('mod-description').value.trim();
    const descriptionPreview = document.getElementById('mod-description-preview');
    descriptionPreview.innerHTML = converter.makeHtml(description);
    document.querySelector('#mod-description-character-count').innerHTML = document.querySelector('#mod-description')?.value.length || "0";
}

async function main() {
    btnOneClickInstall.addEventListener('click', () => {
        openModal('#modalOneClickInstall');
    });
    document.querySelector('#mod-description')?.addEventListener('input', (event) => {
        renderDescriptionPreview();
    });
    renderDescriptionPreview();
    updateModBtn.addEventListener('click', () => {
        showLoadingScreen();
        updateModBtn.disabled = true;
        const formData = new FormData();
        formData.append('name', sanitizeText(document.getElementById('mod-name').value.trim()));
        formData.append('shortDescription', sanitizeText(document.getElementById('mod-shortDescription').value.trim()));
        formData.append('description', document.getElementById('mod-description').value.trim());
        formData.append('isNSFW', document.getElementById('mod-isNSFW').checked);
        formData.append('modThumbnail', modThumbnail.files[0]);
        fetch(`/api/mods/${mod.author_slug}/${mod.slug}/details`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + user.token,
            },
            body: formData  
        }).then((response) => response.json()).then((data) => {
            if (data && data.status) {
                updateModBtn.classList.add('hidden');
                location.href = `/mods/${mod.author_slug}/${mod.slug}?updated=true`;
                return;
            } else {
                throw data;
            }
        }).catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
            showError(error);
        }).finally(() => {
            updateModBtn.disabled = false;
            hideLoadingScreen();
        });
    });
    releaseVersionBtn.addEventListener('click', () => {
        showLoadingScreen();
        releaseVersionBtn.disabled = true;
        const modVersion = document.getElementById('mod-version').value.trim();
        const modChangelog = sanitizeText(document.getElementById('mod-changelog').value.trim());
        const modFile = document.getElementById('mod-file');
        if (!modVersion || !modChangelog) {
            showError('Please fill in all the fields');
            releaseVersionBtn.disabled = false;
            hideLoadingScreen();
            return;
        }

        const formData = new FormData();
        formData.append('version', modVersion);
        formData.append('changelog', modChangelog);
        formData.append('modFile', modFile.files[0]);

        fetch(`/api/mods/${mod.author_slug}/${mod.slug}/release`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token,
            },
            body: formData,
        }).then((response) => response.json()).then((data) => {
            if (data.status) {
                releaseVersionBtn.classList.add('hidden');
                location.href = `/mods/${mod.author_slug}/${mod.slug}?released=true`;
            } else {
                throw data;
            }
        }).catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
            showError(error);
        }).finally(() => {
            releaseVersionBtn.disabled = false;
            hideLoadingScreen();
        });
    });
}

main();
