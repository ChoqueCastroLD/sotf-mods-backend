export function doSearch(elements, searchFor) {
    elements.forEach(element => {
        const searchstring = element.getAttribute('data-searchstring') + "";
        if (searchstring.toLowerCase().includes(searchFor.toLowerCase())) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
}