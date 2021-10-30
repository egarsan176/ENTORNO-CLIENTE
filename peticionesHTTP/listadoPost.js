//guardo en unas variables los elementos del html donde se publicarán los datos
const tabla = document.querySelector("table");
const cabecera= document.querySelector("thead");
const cuerpo = document.querySelector("tbody");

//creo una nueva petición. GET para coger la info del json de post
const peticion = new XMLHttpRequest();
peticion.open('GET', 'http://localhost:3000/posts');
peticion.send();

let contadorPost = 1;

//para añadir datos de los post a la tabla
peticion.addEventListener("load", function(){
    //si la petición se envía
    if(peticion.status===200){

        //creo la cabecera de la tabla
        let c = document.createElement("th");
        c.textContent = "Número"
        let c1 = document.createElement("th");
        c1.textContent = "Título";
        let c2 = document.createElement("th");
        c2.textContent = "Autor";
        let c3 = document.createElement("th");
        c3.textContent = "Opciones";

        cabecera.appendChild(c);
        cabecera.appendChild(c1);
        cabecera.appendChild(c2);
        cabecera.appendChild(c3);

        tabla.appendChild(cabecera);

        //creo el objeto para usar en javascript que contiene la info del json, crea como un array, un objeto con sus propiedades
        let posts = JSON.parse(peticion.responseText);

        //recorro cada elemento y por cada uno de ellos hago x cosas
        posts.forEach(post => {
            
            let fila = document.createElement("tr"); 
            let celda = document.createElement("td");
            let celda1 = document.createElement("td");
            let celda2 = document.createElement("td");
            let celda3 = document.createElement("td");

            celda.textContent = contadorPost;
            contadorPost++;
            celda1.textContent = post.title;
            celda2.textContent = post.author;

            fila.appendChild(celda);
            fila.appendChild(celda1);
            fila.appendChild(celda2);
            
            //creo el boton de ver
            let botVer = document.createElement("a");
            botVer.textContent="< VER > ";
            botVer.classList.add("ver");
            botVer.setAttribute("href", "visualizador.html?id="+post.id) //nos lleva al post del id concreto
            celda3.appendChild(botVer);
            fila.appendChild(celda3);

            let separador = document.createElement("p");
            peticion.textContent="|";
            celda3.appendChild(separador);
            fila.appendChild(celda3);

            //creo el boton de borrar
            let botDel = document.createElement("a");
            botDel.textContent="< BORRAR >";
            //le añado una clase y un id (que sea el mismo del post)
            botDel.classList.add("borrar");
            botDel.id = post.id;
            celda3.appendChild(botDel);
            fila.appendChild(celda3);

            //añado toda la info recopilada del post a la tabla
            cuerpo.appendChild(fila);

            //una barra para separar un post de otro
            let barra = document.createElement("hr");
            cuerpo.appendChild(barra);


        });


    }else{
        alert("No se ha podido cargar la página")
    }
}
)

//ELIMINAR POST
tabla.addEventListener("click", borrarPost);

function borrarPost(event){
    //busca el evento que tenga la clase borrar, para que solo se ejecute en el boton borrar y no en cualquier parte de la tabla
    if(event.target && event.target.matches("a.borrar")){
        event.preventDefault();

        let id = event.target.id; //guardo el id del evento, que es el del post seleccionado

        const peticionBORRAR = new XMLHttpRequest();
        peticionBORRAR.open('DELETE', 'http://localhost:3000/posts/'+id);
        peticionBORRAR.send();
        peticionBORRAR.addEventListener("load", function(){
        if(peticionBORRAR.status===200){
            alert("Post eliminado");
        }else{
            alert("error")
        }
        })
        
    }
}



