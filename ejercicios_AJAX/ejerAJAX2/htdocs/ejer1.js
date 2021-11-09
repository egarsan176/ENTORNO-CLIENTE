const disponibilidad = document.querySelector("#disponibilidad");
const boton = document.querySelector('#comprobar');
let valorLogin = document.getElementById("login").value; 

boton.addEventListener("click", (e) =>{
    e.preventDefault();
       
    let formData = new FormData();     //también puedo enviar el contenido del form entero especificando el id del formulario
    formData.append('login', valorLogin);

    //hago la peticion a la página php
    fetch('http://ejerajax2.loc/compruebaDisponibilidadXML.php',  
    {method: 'POST',
    body: formData
    })   
    .then(response => {
        if(response.ok){    //si la promesa se resuelve
            return response.text(); //la transformo en texto
        }
        return Promise.reject(response);    //si no se resuelve
    })

    .then(datos => {    //datos es la respuesta del php 
        //console.log(datos)

        const parser = new DOMParser(); //creo el objeto parseador
        const xml = parser.parseFromString(datos, "application/xml");

        mostrarRespuesta(xml);

    })

    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    }) 

})


function mostrarRespuesta(xml){

    let usuario = document.getElementById("login").value;   //el valor del input en elq ue se pone el nombre
    let parrafo = document.createElement("p");
    let parrafo2 = document.createElement("p");

    let respuesta = xml.getElementsByTagName("respuesta")[0]
    let disponible = respuesta.getElementsByTagName("disponible")[0].firstChild.nodeValue;
    //console.log(disponible[0].textContent); //para ver la respuesta


    if(disponible == "si"){
        parrafo.textContent = "El usuario "+usuario+" "+ "esta disponible."
        disponibilidad.appendChild(parrafo);
    

    }else if(disponible == "no"){

        parrafo.textContent = "El usuario "+usuario+" "+ "NO esta disponible."
        parrafo2.textContent = "Puedes escoger una de las siguientes opciones: "
        disponibilidad.appendChild(parrafo);
        disponibilidad.appendChild(parrafo2);

        mostrarOpciones(respuesta);

    }

}

function mostrarOpciones(xml){
 //console.log("Entra en la funcion")

 let alternativas = xml.getElementsByTagName("alternativas")[0];    //alternativas contiene las opciones de login
 let ejemploslogin = alternativas.getElementsByTagName("login")
 let ul = document.createElement("ul")
 ul.setAttribute("id", "listaOpciones") //le pongo un id para poder luego acceder a ella 

 for (let i=0; i < ejemploslogin.length; i++){ 

    let li = document.createElement("li");
    let enlace = document.createElement("a");
    enlace.setAttribute("href", "#")

    enlace.textContent = ejemploslogin[i].textContent

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
