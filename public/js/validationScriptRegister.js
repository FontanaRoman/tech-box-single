window.addEventListener("load",()=>{
    const formulario = document.querySelector(".validacionesForm");
    const cargarErrores = document.querySelector(".errores__form");


    formulario.addEventListener("submit",(e)=>{
        e.preventDefault()

        const error = [];

        let nombre = document.querySelector(".nombre");
        let apellido = document.querySelector(".apellido");
        let correo = document.querySelector(".correo");
        let contraseña = document.querySelector(".contraseña");
        let telefono = document.querySelector(".telefono");
        let codigoPostal = document.querySelector(".codigoPostal");
        let direccion = document.querySelector(".direccion");

        if(nombre.value == ""){
            error.push("Tienes que ingresar un nombre");
        }else if(nombre.length < 5){
            error.push("El nombre tiene que tener minimo 5 caracteres")
        }

        if(apellido.value == ""){
            error.push("Tienes que ingresar un apellido");
        }else if(apellido.length < 5){
            error.push("El apellido tiene que tener minimo 5 caracteres")
        }

        if(correo.value == ""){
            error.push("Tienes que ingresar un correo");
        }

        if(contraseña.value == ""){
            error.push("Tienes que ingresar una contraseña");
        }else if(contraseña.length < 5){
            error.push("La contraseña tiene que contar con al menos 5 caracteres")
        }

        if(telefono.value == ""){
            error.push("Tienes que ingresar un numero telefonico");
        }

        if(codigoPostal.value == ""){
            error.push("Tienes que ingresar el codigo postal de tu ciudad");
        }

        if(direccion.value == ""){
            error.push("Tienes que ingresar tu direccion para envios");
        }

        if(error.length > 0){
            cargarErrores.innerHTML = '';
            for (let i = 0; i < error.length; i++) {
                cargarErrores.innerHTML += `<li> ${error[i]} </li>`  
            }
        }
    })
})