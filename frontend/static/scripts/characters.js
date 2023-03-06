import { doSearch } from "./util/search.js";
import { copyToClipboard } from "./util/copyToClipboard.js";

const toast = document.querySelector('#toast-element');
const toastText = document.querySelector('#toast-text');
const itemElements = [...document.querySelectorAll('tr[data-searchstring]')];
const searchText = document.querySelector('#search-text');
const tableCaption = document.querySelector('#caption');

let lastTimeout = 0;

function copyCommand(command) {
    toastText.innerText = `Copied command: ${command}`;
    clearTimeout(lastTimeout);
    copyToClipboard(command);
    toast.classList.remove('hidden');
    lastTimeout = setTimeout(() => {
        toast.classList.add('hidden');
    }, 5000);
}

window.copyCommand = copyCommand;

searchText.addEventListener('keyup', () => {
    const search = searchText.value.toLowerCase();
    doSearch(itemElements, search);
    tableCaption.innerText = `Showing ${itemElements.filter(e => !e.classList.contains('hidden')).length} of ${itemElements.length} characters`;
});
