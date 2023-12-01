window.addEventListener("load",()=>{
    const formulario = document.querySelector(".validacionesForm");
    const cargarErrores = document.querySelector(".errores__form");


    formulario.addEventListener("submit",(e)=>{

        const error = [];

        let nombre = document.querySelector(".nombre");
        let cantidad = document.querySelector(".cantidad");
        let descriccion = document.querySelector(".descriccion");
        let precio = document.querySelector(".precio");
        let imagen = document.querySelector(".imagen");


        if(nombre.value == ""){
            error.push("Tienes que ingresar un nombre");
        }else if(nombre.length < 5){
            error.push("El nombre tiene que tener minimo 5 caracteres")
        }

        if(cantidad.value == ""){
            error.push("Tienes que ingresar la cantidad disponible");
        }

        if(descriccion.value == ""){
            error.push("Tienes que ingresar una descripccion");
        }

        if(precio.value == ""){
            error.push("Tienes que ingresar un precio");
        }

        if(imagen.value == ""){
            error.push("Tienes que ingresar una imagen");
        }

        if(error.length > 0){
            cargarErrores.innerHTML = '';
            for (let i = 0; i < error.length; i++) {
                cargarErrores.innerHTML += `<li> ${error[i]} </li>`  
            }

            e.preventDefault()
        }
    })
})