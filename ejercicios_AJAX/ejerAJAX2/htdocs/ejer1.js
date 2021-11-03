const disponibilidad = document.querySelector("#disponibilidad");
const boton = document.querySelector('#comprobar');

boton.addEventListener("click", (e) =>{
    e.preventDefault();

    fetch('http://ejerajax2.loc/compruebaDisponibilidadXML.php')   //hago la peticion a la página php
    .then(response => {
        if(response.ok){    //si la promesa se resuelve
            return response.text(); //la transformo en texto
        }
        return Promise.reject(response);    //si no se resuelve
    })

    .then(datos => {    //datos es la respuesta del php 

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
 ul.setAttribute("id", "listaOpciones")

 for (let i=1; i < ejemploslogin.length; i++){ //pongo i = 1 porque la i=0 está vacía

    let li = document.createElement("li");

    li.textContent = ejemploslogin[i].textContent
    ul.appendChild(li);
 }

 disponibilidad.appendChild(ul)
}


listaOpciones = document.getElementById("listaOpciones");
//con un evento capturo la  opcion que se muestra de los ul y la selecciono para ponerlo en el input
listaOpciones.addEventListener("click", (e) =>{

    if(e.target.matches('li')){
        
    }
})