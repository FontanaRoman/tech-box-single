window.addEventListener("load",()=>{
    const formulario = document.querySelector(".validacionesForm");
    const cargarErrores = document.querySelector(".errores__form");

    alert("funcionando")

    formulario.addEventListener("submit",(e)=>{
        e.preventDefault()

        const error = [];

        let contraseña = document.querySelector(".contraseña");
        let correo = document.querySelector(".correo");

        if(correo.value == ""){
            error.push("Tienes que ingresar un correo");
        }

        if(contraseña.value == ""){
            error.push("Tienes que ingresar una contraseña");
        }else if(contraseña.length < 5){
            error.push("La contraseña tiene que contar con al menos 5 caracteres")
        }

        if(error.length > 0){
            cargarErrores.innerHTML = '';
            for (let i = 0; i < error.length; i++) {
                cargarErrores.innerHTML += `<li> ${error[i]} </li>`  
            }
        }
    })
})