const registerForm = document.querySelector('#register-form');
const emailError = document.querySelector('#email-error');
const usernameError = document.querySelector('#username-error');
const passwordError = document.querySelector('#password-error');
const confirmPasswordError = document.querySelector('#confirm_password-error');
const submitError = document.querySelector('#submit-error');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);

    if (data.password !== data.confirm_password) {
        confirmPasswordError.textContent = 'Passwords do not match';
        return;
    }

    try {
        submitError.textContent = '';
        emailError.textContent = '';
        usernameError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        const response = await fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const jsonResponse = await response.json();

        if (jsonResponse.errors && jsonResponse.errors.length > 0) {
            const errors = jsonResponse.errors;
            for (const error of errors) {
                if (error.field === 'email') {
                    emailError.textContent = error.message;
                } else if (error.field === 'name') {
                    usernameError.textContent = error.message;
                } else if (error.field === 'password') {
                    passwordError.textContent = error.message;
                } else if (error.field === 'confirm_password') {
                    confirmPasswordError.textContent = error.message;
                }
            }
            submitError.textContent = '';
        } else {
            registerForm.reset();
            location.href = '/user/login?registered=true';
        }
    } catch (error) {
        console.error(error);
        submitError.textContent = 'An error occurred. Please try again later.';
    }
});