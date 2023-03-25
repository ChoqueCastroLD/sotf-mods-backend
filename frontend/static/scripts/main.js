const darkModeCheckbox = document.querySelector('#checkbox-darkmode');
let darkMode = localStorage.getItem('darkMode') === 'enabled';
darkModeCheckbox.checked = darkMode;
if (darkMode) {
    document.querySelector('html').classList.add('dark');
}
darkModeCheckbox.addEventListener('change', () => {
    if (darkMode) {
        localStorage.setItem('darkMode', 'disabled');
        document.querySelector('html').classList.remove('dark');
    } else {
        localStorage.setItem('darkMode', 'enabled');
        document.querySelector('html').classList.add('dark');
    }
    darkMode = !darkMode;
});