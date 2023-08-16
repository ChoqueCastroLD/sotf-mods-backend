const loadingScreen = document.querySelector('#loading-screen');

document.querySelector('#countdown-screen').showModal();
window.countdownHTML = document.querySelector('#countdown-screen').innerHTML.substring(0, 60);
window.haveCLicked = 0;
document.querySelector('#countdown-screen').addEventListener('click', () => {
    window.haveCLicked += 1;
});
let isOpen = true;

window.interval = setInterval(() => {
    // if query param bypass
    if (window.location.search.includes('bypass')) {
        try {
            console.log('bypass');
            document.querySelector('#countdown-screen').close();
            document.querySelector('#countdown-screen').innerHTML ='';
            document.querySelector('#countdown-screen').remove()
            document.body.parentElement.style.overflow = 'unset';
            clearInterval(interval);
            
        } catch (error) {
            
        }
        return;
    }
    if(!isOpen) return;
    const countdownScreen = document.querySelector('#countdown-screen');
    if (window.haveCLicked > 3) {
        console.log(1);
        isOpen = false;
    } if((countdownScreen && countdownScreen.innerHTML.substring(0, 60)) !== window.countdownHTML) {
        window.a = countdownScreen.innerHTML;
        console.log(12);
        window.b = window.countdownHTML
        isOpen = false;
    } else if(!countdownScreen) {
        console.log(3);
        isOpen = false;
    } else if (!(countdownScreen && countdownScreen.showModal)) {
        console.log(4);
        isOpen = false;
    } else if (!(countdownScreen && countdownScreen.open)) {
        console.log(5);
        isOpen = false;
    } else if ((countdownScreen && countdownScreen.style.display === 'none')) {
        console.log(69);
        isOpen = false;
    } else if ((countdownScreen && countdownScreen.style.display === 'hidden')) {
        console.log(8);
        isOpen = false;
    } else if ((countdownScreen && countdownScreen.style.visibility === 'hidden')) {
        isOpen = false;
    } else if ((countdownScreen && countdownScreen.style.visibility === 'collapse')) {
        isOpen = false;
    }
    if (!isOpen) {
        document.querySelector('body').innerHTML = `
        <div class="flex flex-col justify-center items-center h-screen m-8">
            <h1 class="text-4xl font-bold mb-4">Oops! You should not do that.</h1>
            <p class="text-xl">Please refresh the page.</p>
            <p class="text-xl ">Or talk to Kelvin as you reflect on your actions</p>
            <div class="w-full flex justify-center m-8">
                <input id="txtBox" type="text" placeholder="Type here" class="input input-bordered input-accent" value="why are you dissapointed in me?" style="width: 600px;" />
                <button id="btnSend" class="btn btn-active btn-ghost ml-4">Write</button>
            </div>
            <div class="mb-8 p-8" style="width: 700px;">
                <p class="text-xl">Kelvin says:</p>
                <p id="kelvin-text" class="text-xl">"I am disappointed in you."</p>
            </div>
            <img id="kelvin-waiting" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZUBqgQr33xgSsIZ3oCUjlAI0FjwIprt17tnp92N8Ke8o6UJmWVK2uud0rRachhammAg&usqp=CAU" class="w-1/2" />
            <img id="kelvin-thinking" class="hidden" src="https://media.tenor.com/zdP6K6EBNDQAAAAC/kelvin-the-forest.gif" class="w-1/2" />
        </div>`;
        document.querySelector('#btnSend').addEventListener('click', () => {
            document.querySelector('#btnSend').classList.add('btn-disabled');
            document.querySelector('#kelvin-waiting').classList.add('hidden');
            document.querySelector('#kelvin-thinking').classList.remove('hidden');
            document.querySelector('#kelvin-text').innerHTML = '';
            const text = (document.querySelector('#txtBox').value+"").trim();
            document.querySelector('#txtBox').classList.add('disabled');
            document.querySelector('#txtBox').disabled = true;
            setTimeout(() => {
                fetch('/api/kelvin-gpt?context=everything the player says kelvin answers with sad and dissapointment, kelvin is dissapointed because the player tried to see the sotf-mods.com website redesign before the official release&text=' + text)
                    .then(res => res.text())
                    .then(data => {
                        document.querySelector('#kelvin-text').innerHTML = `"${data.split('|')[1].trim()}"`;
                        document.querySelector('#txtBox').value = '';
                        document.querySelector('#kelvin-waiting').classList.remove('hidden');
                        document.querySelector('#kelvin-thinking').classList.add('hidden');
                        document.querySelector('#btnSend').classList.remove('btn-disabled');
                        document.querySelector('#txtBox').classList.remove('disabled');
                        document.querySelector('#txtBox').disabled = false;

                    }).catch(err => {
                        console.log(err)
                        document.querySelector('#kelvin-text').innerHTML = `guess what`;
                    }).finally(() => {
                        document.querySelector('#txtBox').value = '';
                        document.querySelector('#kelvin-waiting').classList.remove('hidden');
                        document.querySelector('#kelvin-thinking').classList.add('hidden');
                        document.querySelector('#btnSend').classList.remove('btn-disabled');
                        document.querySelector('#txtBox').classList.remove('disabled');
                        document.querySelector('#txtBox').disabled = false;
                    });
            }, 1000);
        clearInterval(interval);
    });
}
}, 500);
const targetTimestamp = 1692191000463;

// Function to update the countdown
function updateCountdown() {
  const now = new Date().getTime();
  const timeRemaining = targetTimestamp - now;

  if (timeRemaining <= 0) {
    clearInterval(interval);
    return;
  }

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
try {
    
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
  
    hoursSpan.style = `--value:${hours};`;
    minutesSpan.style = `--value:${minutes};`;
    secondsSpan.style = `--value:${seconds};`;
} catch (error) {
}
}

// Initial call to update countdown
updateCountdown();

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);
    





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

