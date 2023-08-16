const loginForm = document.querySelector('#login-form');

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('registered')) {
    showSuccess("Success! You have successfully registered. Please login.");
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const { errors, token } = await response.json();
        
        if (errors && errors.length > 0) {
            throw errors[0].message;
        }

        loginForm.reset();
        document.cookie = `token=${token}; Path=/`;
        location.href = '/';
    } catch (error) {
        console.error(error);
        showError(error);
    }
});
