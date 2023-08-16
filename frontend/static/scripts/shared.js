const loadingScreen = document.querySelector('#loading-screen');

window.showLoadingScreen = () => {
    loadingScreen.showModal();
    loadingScreen.style.display = 'flex';
}
window.hideLoadingScreen = () => {
    loadingScreen.close();
    loadingScreen.style.display = 'none';
}
window.errorTimeout = null;
window.showError = error => {
    document.querySelector('#alerts').classList.add('animate__backInRight');
    document.querySelector('#alerts').innerHTML = `
    <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! ${error?.message || error?.error || error || 'Something went wrong!'}</span>
    </div>`;
    clearTimeout(window.errorTimeout);
    window.errorTimeout = setTimeout(() => {
        document.querySelector('#alerts').classList.add('animate__backOutRight');
        setTimeout(() => {
            document.querySelector('#alerts').innerHTML = '';
            document.querySelector('#alerts').classList.remove('animate__backOutRight');
            document.querySelector('#alerts').classList.remove('animate__backInRight');
        }, 800);
    }, 15000);
};
window.successTimeout = null;
window.showSuccess = message => {
    document.querySelector('#alerts').classList.add('animate__backInRight');
    document.querySelector('#alerts').innerHTML = `
    <div class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>${message}</span>
    </div>`;
    clearTimeout(window.successTimeout);
    window.successTimeout = setTimeout(() => {
        document.querySelector('#alerts').classList.add('animate__backOutRight');
        setTimeout(() => {
            document.querySelector('#alerts').innerHTML = '';
            document.querySelector('#alerts').classList.remove('animate__backOutRight');
            document.querySelector('#alerts').classList.remove('animate__backInRight');
        }, 800);
    }, 15000);
};

