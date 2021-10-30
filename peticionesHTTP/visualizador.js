// MOSTRAR POSTS

//guardo las variables en las que quiero introducir la información en el html
let titulo = document.getElementById("titulo");
let autor = document.getElementById("autor");
let contenido = document.getElementById("descrip");

//creo la petición
let petMostrarPost = new XMLHttpRequest();
let url = window.location.search;    //consigue la parte de la url que viene después de ?
let urlParams = new URLSearchParams(url); //guardamos la url usando URLSearchParams porque nos ofrece métodos útiles
const id = urlParams.get('id'); //recupero el id de la URL
petMostrarPost.open('GET', `http://localhost:3000/posts?id=${id}`); //abro la petición que me dirige al post del id seleccionado
petMostrarPost.send();


//CREO EL POST Y MUESTRO EL COMENTARIO ASOCIADO AL POST
petMostrarPost.addEventListener('readystatechange', function(){
    if(petMostrarPost.readyState===4){
        if(petMostrarPost.status===200){

            //creo el objeto JSON de la petición
            const listaPost = JSON.parse(petMostrarPost.responseText);
            //creo una variable a la que le asigno el valor title del post del json
            let texto = document.createTextNode(listaPost[0].title);
            titulo.appendChild(texto);

            let aut = document.createTextNode(listaPost[0].author);
            autor.appendChild(aut);

            let descrip = document.createTextNode(listaPost[0].text);
            contenido.appendChild(descrip);
            publicarComentario(id)
        }
    }
})


//MOSTRAR USUARIOS A SELECCIONAR EN LOS COMENTARIOS

const espacioUsuarios = document.getElementById("opcionesUser");

const peticionUsuarios = new  XMLHttpRequest();
peticionUsuarios.open('GET', "http://localhost:3000/users");
peticionUsuarios.send();

peticionUsuarios.addEventListener("load", function () {

    if (peticionUsuarios.status === 200){

        let users = JSON.parse(peticionUsuarios.responseText);
        let contador = 1;

        users.forEach(user => {
            let opcion = document.createElement("option");
            opcion.setAttribute("value", contador);
            contador++;
            opcion.textContent = user.userName;
            espacioUsuarios.appendChild(opcion);
        });
    }else{
        alert("adiós")
    }
})


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
    
        //creo la petición para enviar los datos del comentario al json
        const peticionComentario = new XMLHttpRequest();
        peticionComentario.open('POST', 'http://localhost:3000/comments');
        peticionComentario.setRequestHeader('Content-type', 'application/json'); // Siempre tiene que estar esta línea si se envían datos
        peticionComentario.send(JSON.stringify(contenidoComentario)); // Hay que convertir el objeto a una cadena de texto JSON para enviarlo
        peticionComentario.addEventListener("load", function(){
            if(peticionComentario===201){
                //publicarComentario();
                alert("Comentario enviado")

            }else{
                alert("error");
            }

        })

    }

    
})

//para publicar un comentario y le paso el id del post para que se asocien
function publicarComentario(id){

    const petPubliComentario = new XMLHttpRequest();
    //selecciono la url del post concreto en el que estoy
    petPubliComentario.open('GET', 'http://localhost:3000/comments?idPost='+id);
    petPubliComentario.send();
    petPubliComentario.addEventListener("load", function(){
        if(petPubliComentario.status===200){

            let comentarios = JSON.parse(petPubliComentario.responseText);
            comentarios.forEach(comentario => {
                
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
        else{
            alert("error")
        }
    })
}








