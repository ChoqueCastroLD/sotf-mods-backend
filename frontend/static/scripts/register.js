const registerForm = document.querySelector('#register-form');
const confirmPasswordError = document.querySelector('#confirm_password-error');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    
    try {
        if (data.password !== data.confirm_password) {
            throw 'Passwords do not match';
        }
        const response = await fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const { errors } = await response.json();

        if (errors && errors.length > 0) {
            throw errors[0].message;
        }

        registerForm.reset();
        location.href = '/user/login?registered=true';
    } catch (error) {
        console.error(error);
        showError(error);
    }
});