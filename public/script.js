document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isRegistering = document.getElementById('submitBtn').textContent === 'Register';

    const url = isRegistering ? '/register' : '/login';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert(isRegistering ? 'Registration successful!' : 'Login successful! Token: ' + result.token);
            if (!isRegistering) {
                // Optionally store the token in localStorage
                localStorage.setItem('token', result.token);
            }
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});

// Toggle between login and registration
document.getElementById('registerLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('formTitle').textContent = 'Register';
    document.getElementById('submitBtn').textContent = 'Register';
    document.getElementById('toggleLink').innerHTML = 'Already have an account? <a href="#" id="loginLink">Login</a>';
});

// Handle the switch back to login
document.addEventListener('click', (e) => {
    if (e.target.id === 'loginLink') {
        e.preventDefault();
        document.getElementById('formTitle').textContent = 'Login';
        document.getElementById('submitBtn').textContent = 'Login';
        document.getElementById('toggleLink').innerHTML = 'Don\'t have an account? <a href="#" id="registerLink">Register</a>';
    }
});
