const darkModeCheckbox = document.querySelector('#checkbox-darkmode');

let darkMode = true;
if (localStorage.getItem('darkMode') === 'disabled') {
    darkMode = false;
}

applyDarkMode();

darkModeCheckbox.addEventListener('change', () => {
    updateDarkMode();
    applyDarkMode();
});

function updateDarkMode() {
    if (darkMode) {
        localStorage.setItem('darkMode', 'disabled');
        darkMode = false;
    } else {
        localStorage.setItem('darkMode', 'enabled');
        darkMode = true;
    }
}

function applyDarkMode() {
    if (darkMode) {
        document.querySelector('html').classList.add('dark');
        darkModeCheckbox.checked = true;
    } else {
        document.querySelector('html').classList.remove('dark');
        darkModeCheckbox.checked = false;
    }
}
