const loadingScreen = document.querySelector('#loading-screen');

window.showLoadingScreen = () => {
    loadingScreen.showModal();
    loadingScreen.style.display = 'flex';
}
window.hideLoadingScreen = () => {
    loadingScreen.close();
    loadingScreen.style.display = 'none';
}
window.openModal = (modalSelector) => {
    document.querySelector(modalSelector).classList.add('modal-open');
}
window.closeModal = (modalSelector) => {
    document.querySelector(modalSelector).classList.remove('modal-open');
}
window.errorTimeout = null;
window.showError = error => {
    document.querySelector('#alert-wrapper').style.display = 'flex';
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
            document.querySelector('#alert-wrapper').display = 'none';
            // document.querySelector('#alert-wrapper').close();
        }, 800);
    }, 15000);
};
window.successTimeout = null;
window.showSuccess = message => {
    document.querySelector('#alert-wrapper').style.display = 'flex';
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
            document.querySelector('#alert-wrapper').style.display = 'none';
            // document.querySelector('#alert-wrapper').close();
        }, 800);
    }, 15000);
};

window.sanitizeText = (text) => {
    if (!text) return "";
    const allowedPattern = /[^a-zA-Z0-9,.¡!¿?$%&()#+;/'" _-]/g;
    const sanitizedInput = DOMPurify.sanitize(text).replace(allowedPattern, "");
    return sanitizedInput.trim().replace(/<[^>]*>?/gm, '');
}

window.debounceDict = {};
window.addEventListenerDebounce = (name, element, event, callback) => {
    element.addEventListener(event, () => {
        clearTimeout(window.debounceDict[name]);
        window.debounceDict[name] = setTimeout(() => {
            callback();
        }, 300);
    });
}


if (window.showdown) {
    showdown.setOption('simpleLineBreaks', true);
    showdown.setOption('smoothLivePreview', true);
    showdown.setOption('simplifiedAutoLink', true);
    showdown.setOption('noHeaderId', true);
    showdown.setOption('tasklists', true);
    
    window.converter = new showdown.Converter();
    
    window.markdownToHTML = text => {
        const lineBreakToken = Date.now();
        text = text.split('\n').map(v => v.trim() == '' ? lineBreakToken : '\n' + v ).join('');
        const html = converter.makeHtml(text);
        const h = html.replaceAll('\n', '').replaceAll(lineBreakToken, '<br>');
        return h;
    }
}


function lazyLoadImages(elements) {
    elements.forEach(img => {
        const imageUrl = img.dataset.lazySrc;
        img.removeAttribute('data-lazy-src');
        img.src = imageUrl + '/preview';
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const image = URL.createObjectURL(blob);
                img.src = image;
            })
            .catch(error => {
                // we just ignore the error and let the browser handle it
                img.src = imageUrl;
            });
    });
}

const mutationCallback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
            if (node instanceof Element) {
                lazyLoadImages(node.querySelectorAll('img[data-lazy-src]'));
            }
        });
      }
    }
};
  
const observerOptions = {
    childList: true,
    subtree: true,
    attributes: true,
};

const observer = new MutationObserver(mutationCallback);

lazyLoadImages(document.querySelectorAll('img[data-lazy-src]'));

observer.observe(document.body, observerOptions);