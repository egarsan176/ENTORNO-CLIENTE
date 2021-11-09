const disponibilidad = document.querySelector("#disponibilidad");
const comprobar = document.querySelector('#comprobar');

comprobar.addEventListener("click", (e) =>{
    e.preventDefault();
       
     let formData = new FormData(); 
     let login = document.getElementById("login").value;    //también puedo enviar el contenido del form entero especificando el id del formulario
     formData.append("login", login );

    //hago la peticion a la página php
    // fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio3/servidor/compruebaDisponibilidadJSON.php',  
    fetch('http://ejerajax3.loc/compruebaDisponibilidadJSON.php',  
    {
        method: 'POST',
        body: formData//login //JSON.stringify(login)
    })   
    .then(response => {
        if(response.ok){    //si la promesa se resuelve
            //console.log(response.json())
            return response.json(); //la transformo en json
        }
        return Promise.reject(response);    //si no se resuelve
    })

    .then(datos => {    //datos es la respuesta del php 
        console.log(datos)

        mostrarRespuesta(datos);

    })

    .catch(err => {
        console.log('Error en la peticion HTTP: '+err.message);
    }) 

})


function mostrarRespuesta(datos){

    let usuario = document.getElementById("login").value;   //el valor del input en elq ue se pone el nombre
    
    let parrafo = document.createElement("p");
    let parrafo2 = document.createElement("p");


    if(datos.disponible == "si"){
        parrafo.textContent = "El usuario "+usuario+" "+ "esta disponible."
        disponibilidad.appendChild(parrafo);
    

    }else if(datos.disponible == "no"){

        parrafo.textContent = "El usuario "+usuario+" "+ "NO esta disponible."
        parrafo2.textContent = "Puedes escoger una de las siguientes opciones: "
        disponibilidad.appendChild(parrafo);
        disponibilidad.appendChild(parrafo2);

        mostrarOpciones(datos);

    }

}

function mostrarOpciones(datos){
 //console.log("Entra en la funcion")

 let alternativas = datos.alternativas    //alternativas contiene las opciones de login
 let ul = document.createElement("ul")
 ul.setAttribute("id", "listaOpciones") //le pongo un id para poder luego acceder a ella 

 for (let i=0; i < alternativas.length; i++){ 

    let li = document.createElement("li");
    let enlace = document.createElement("a");
    enlace.setAttribute("href", "#")

    enlace.textContent = alternativas[i]

    li.appendChild(enlace)
    ul.appendChild(li);
 }

 disponibilidad.appendChild(ul)
}


//con un evento capturo la  opcion que se muestra de los ul y la selecciono para ponerlo en el input
disponibilidad.addEventListener("click", (e) =>{

    if(e.target.matches('a')){
        let nuevoNombre = e.target.textContent
        let inputUsuario = document.getElementById("login");

        inputUsuario.value = nuevoNombre
        
    }
})

    
