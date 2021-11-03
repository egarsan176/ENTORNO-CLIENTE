const disponibilidad = document.querySelector("#disponibilidad");
const boton = document.querySelector('#comprobar');

boton.addEventListener("click", (e) =>{
    e.preventDefault();

    fetch('http://ejerajax1.loc/compruebaDisponibilidad.php')   //hago la peticion a la página php
    .then(response => {
        if(response.ok){    //si la promesa se resuelve
            return response.text(); //la transformo en texto
        }
        return Promise.reject(response);    //si no se resuelve
    })

    .then(datos => {    //datos es la respuesta del php y tiene dos valores o si o no

        mostrarRespuesta(datos);

    })

    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    }) 

})

function mostrarRespuesta(datos){

    let usuario = document.getElementById("login").value;   //el valor del input en el que se pone el nombre
    let parrafo = document.createElement("p");
    
    //datos puede tomar dos valores del php, si o no
    //le añado al parrafo si el nombre del usuario está o no disponible con la respuesta del php
    parrafo.innerHTML = "El usuario "+usuario+" "+datos+" esta disponible."

    disponibilidad.appendChild(parrafo);


}