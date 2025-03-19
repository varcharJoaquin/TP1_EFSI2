document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registroForm");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmarPassword = document.getElementById("confirmarPassword");
    const mensajeExito = document.getElementById("mensajeExito");

    const nombreError = document.getElementById("nombreError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmarPasswordError = document.getElementById("confirmarPasswordError");

    function mostrarError(input, mensaje) {
        const errorSpan = document.getElementById(input.id + 'Error');
        errorSpan.textContent = mensaje;
        errorSpan.style.display = 'block'; 
        input.classList.add("invalid");
        input.classList.remove("valid");
    }

    function mostrarExito(input) {
        const errorSpan = document.getElementById(input.id + 'Error');
        errorSpan.textContent = "";
        errorSpan.style.display = 'none'; 
        input.classList.add("valid");
        input.classList.remove("invalid");
    }

    function validarNombre() {
        if (nombre.value.trim().length >= 3) {
            mostrarExito(nombre);
            return true;
        } else {
            mostrarError(nombre, "Debe tener al menos 3 caracteres");
            return false;
        }
    }

    function validarEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email.value.trim())) {
            mostrarExito(email);
            return true;
        } else {
            mostrarError(email, "Ingrese un email válido");
            return false;
        }
    }

    function validarPassword() {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passwordRegex.test(password.value)) {
            mostrarExito(password);
            return true;
        } else {
            mostrarError(password, "Debe tener al menos 8 caracteres, 1 letra y 1 número");
            return false;
        }
    }

    function validarConfirmarPassword() {
        if (password.value === confirmarPassword.value && confirmarPassword.value !== "") {
            mostrarExito(confirmarPassword);
            return true;
        } else {
            mostrarError(confirmarPassword, "Las contraseñas no coinciden");
            return false;
        }
    }

    nombre.addEventListener("input", validarNombre);
    email.addEventListener("input", validarEmail);
    password.addEventListener("input", validarPassword);
    confirmarPassword.addEventListener("input", validarConfirmarPassword);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const passwordValido = validarPassword();
        const confirmarPasswordValido = validarConfirmarPassword();

        if (nombreValido && emailValido && passwordValido && confirmarPasswordValido) {
            mensajeExito.textContent = "¡Registro exitoso!";
            mensajeExito.style.display = "block";
            mensajeExito.classList.add("success");
            form.reset();
            setTimeout(() => {
                mensajeExito.style.display = "none";
            }, 3000); 
        }
    });
});
