window.addEventListener("load", () => {
    const formulario = document.querySelector(".validacionesForm");
    const cargarErrores = document.querySelector(".errores__form");

    alert("funcionando");

    formulario.addEventListener("submit", (e) => {
        // No se necesita prevenir el envío del formulario en este caso
        // e.preventDefault();

        const error = [];

        let contraseña = document.querySelector(".contraseña");
        let correo = document.querySelector(".correo");

        if (correo.value == "") {
            error.push("Tienes que ingresar un correo");
        }

        if (contraseña.value == "") {
            error.push("Tienes que ingresar una contraseña");
        } else if (contraseña.value.length < 5) {
            error.push("La contraseña tiene que contar con al menos 5 caracteres");
        }

        // Si hay errores, muestra los errores en cargarErrores
        if (error.length > 0) {
            cargarErrores.innerHTML = '';
            for (let i = 0; i < error.length; i++) {
                cargarErrores.innerHTML += `<li> ${error[i]} </li>`;
            }
            // Evita que el formulario se envíe
            e.preventDefault();
        }
    });
});
