// MOSTRAR POSTS

//guardo las variables en las que quiero introducir la información en el html
let titulo = document.getElementById("titulo");
let autor = document.getElementById("autor");
let contenido = document.getElementById("descrip");


let url = window.location.search;    //consigue la parte de la url que viene después de ?
let urlParams = new URLSearchParams(url); //guardamos la url usando URLSearchParams porque nos ofrece métodos útiles
const id = urlParams.get('id'); //recupero el id de la URL

let urlPost = `http://localhost:3000/posts?id=${id}`;    //url de la que quiero los datos

fetch(urlPost)  //inicio la solicitud a la url y si no pongo nada detrás se entiende que es petición GET
    .then(response => { 
        if(response.ok){    //poner siempre
        return response.json() 
        }
        return Promise.reject(response) 
    })
    .then(data => mostrarPost(data))    
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
      }) 

//función que muestra los datos del post      
function mostrarPost(data){
     //creo una variable a la que le asigno el valor title del post del json
    let texto = document.createTextNode(data[0].title);
    titulo.appendChild(texto);

    let aut = document.createTextNode(data[0].author);
    autor.appendChild(aut);

    let descrip = document.createTextNode(data[0].text);
    contenido.appendChild(descrip);
    publicarComentario(id)  //esta funcion muestra los comentarios asociados a ese post concreto
}

//para publicar un comentario y le paso el id del post para que se asocien
function publicarComentario(id){

    let urlComentarioPost = 'http://localhost:3000/comments?idPost='+id;
    fetch(urlComentarioPost, {method: 'GET'})
        .then(response => { 
            if(response.ok){    //poner siempre
            return response.json() 
            }
            return Promise.reject(response) 
        })
        .then(data => mostrarComentario(data))    
        .catch(err => {
            console.log('Error en la petición HTTP: '+err.message);
        }) 
}

function mostrarComentario(data){

    data.forEach(comentario => {
    
    let espacio = document.getElementById("comentario");
    let texto = document.createElement("p");
    let autorComentario = document.createElement("p");

    texto.textContent = "Contenido: "+comentario.text;
    autorComentario.textContent = "Autor: "+comentario.user;

    espacio.appendChild(texto);
    espacio.appendChild(autorComentario);

    //barra para separar los comentarios
    let barra = document.createElement("hr");
    barra.setAttribute("id", "barra");
    espacio.appendChild(barra);


    });

}


//MOSTRAR USUARIOS A SELECCIONAR EN LOS COMENTARIOS

let urlUsers = "http://localhost:3000/users";    //url de la que quiero los datos

fetch(urlUsers)  
    .then(response => { 
        if(response.ok){    //poner siempre
        return response.json() 
        }
        return Promise.reject(response) 
    })
    .then(data => mostrarUsuarios(data))   
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
      }) 

//función para mostrar los usuarios disponibles al publicar un comentario      
let contador = 1; //para el value del usuario
const espacioUsuarios = document.getElementById("opcionesUser");

function mostrarUsuarios(data){

    data.forEach(user => {
        let opcion = document.createElement("option");
        opcion.setAttribute("value", contador);
        contador++;
        opcion.textContent = user.userName;
        espacioUsuarios.appendChild(opcion);
        });

    }



//PUBLICAR COMENTARIO

let boton = document.getElementById("publiComent");
let select = document.getElementById("opcionesUser");
let usuarioEscogido;
let usuario = false;

//  compruebo que se ha seleccionado un usuario de la lista
select.addEventListener('change', (e) =>{
    if(select.value != "--"){

        usuarioEscogido = select[select.value].text;
        usuario = true;
        
    }
})

//AL PINCHAR EN PUBLICAR
boton.addEventListener("click", function(){

    //compruebo que se ha seleccionado un user y que el comentario tiene texto
    if (usuario === true && document.getElementById("inputComentario").value != ""){

        const contenidoComentario = {
            text: document.getElementById("inputComentario").value,
            user: usuarioEscogido,
            idPost: id
        }

        let urlComentario =  'http://localhost:3000/comments';
        fetch(urlComentario, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(contenidoComentario)
        })
            .then(response => {
                if(response.ok){
                    location.reload();
                    return response.json();
                }
                return Promise.reject(response)
            })
            .catch(err => {
                console.log('Error en la petición HTTP: '+err.message);
            })

    }

    
})