// URL del servidor
const SERVER_URL = 'http://localhost:3000';

// Función para mostrar mensajes
function showMessage(elementId, message, isSuccess = false) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = isSuccess ? 'message success' : 'message';
    } else {
        console.log(message);
    }
}

// Manejar Registro
document.querySelector('.login__register .login__form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    fetch(`${SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())     
        .then(data => {
            if (data.message) {
                showMessage('signup-message', data.message, true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('signup-message', 'Hubo un error durante el registro');
        });
});

// Manejar Login
document.querySelector('.login__access .login__form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirige a principal.html si el inicio de sesión fue exitoso
                window.location.href = 'principal.html';
            } else {
                // Muestra el mensaje de error si las credenciales no son correctas
                showMessage('login-message', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('login-message', 'Hubo un error durante el inicio de sesión');
        });
});
// Mostrar/Ocultar contraseña para el login
const passwordAccess = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye);

    iconEye.addEventListener('click', () => {
        // Cambiar tipo de input
        input.type = input.type === 'password' ? 'text' : 'password';

        // Cambiar icono
        iconEye.classList.toggle('ri-eye-fill');
        iconEye.classList.toggle('ri-eye-off-fill');
    });
};
passwordAccess('login-password','loginPassword')

// Mostrar/Ocultar contraseña para el registro
const passwordRegister = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye);

    iconEye.addEventListener('click', () => {
        // Cambiar tipo de input
        input.type = input.type === 'password' ? 'text' : 'password';

        // Cambiar icono
        iconEye.classList.toggle('ri-eye-fill');
        iconEye.classList.toggle('ri-eye-off-fill');
    });
};
passwordRegister('signup-password','loginPasswordCreate')

// Cambiar entre login y registro
const loginAccessRegister = document.getElementById('loginAccessRegister'),
    buttonRegister = document.getElementById('loginButtonRegister'),
    buttonAccess = document.getElementById('loginButtonAccess');

buttonRegister.addEventListener('click', () => {
    loginAccessRegister.classList.add('active');
});

buttonAccess.addEventListener('click', () => {
    loginAccessRegister.classList.remove('active');
});
