const loginForm = document.querySelector('#login-form');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const submitError = document.querySelector('#submit-error');

const registeredP = document.querySelector('#registered-p');
// check if query params has a ?registered=true and if so, show the registered paragraph
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('registered')) {
    registeredP.innerText = 'You have successfully registered. Please login.';
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    try {
        submitError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const { errors, token } = await response.json();
        console.log({errors, token})
        if (errors && errors.length > 0) {
            for (const error of errors) {
                if (error.field === 'email') {
                    emailError.textContent = error.message;
                } else if (error.field === 'password') {
                    passwordError.textContent = error.message;
                }
            }
            submitError.textContent = '';
        } else {
            loginForm.reset();
            document.cookie = `token=${token}; Path=/`;
            // location.href = '/';
        }
    } catch (error) {
        console.error(error);
        submitError.textContent = 'An error occurred. Please try again later.';
    }
});
