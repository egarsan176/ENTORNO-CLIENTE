//guardo en unas variables los elementos del html donde se publicarán los datos
const tabla = document.querySelector("table");
const cabecera= document.querySelector("thead");
const cuerpo = document.querySelector("tbody");

//uso de fetch

let url = "http://localhost:3000/posts";    //url de la que quiero los datos

fetch(url)  //inicio la solicitud a la url y si no pongo nada detrás se entiende que es petición GET
    .then(response => { //se resuelve la promesa y la pasa a formato json
        if(response.ok){    //poner siempre
        return response.json() 
        }
        return Promise.reject(response) //lanzo un reject que irá al catch más cercano por si la promesa no se ha resuelto
    })
    .then(data => mostrarData(data))    //leemos el objeto data y llamamos a la función para que lo muestre
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
      }) //por si hay algún error como que no funcione la conexión o que la url esté mal


const mostrarData = (data) => {
    
    crearCabeceraTabla();   //llamo a la función que crea la cabecera de la tabla

    let contadorPost = 1;

    data.forEach(element => {   //recorro cada elemento del json que tiene los post
        
        let fila = document.createElement("tr"); 
        for (let i = 0; i < 4; i++){
            let celda = document.createElement("td");
            if (i==0){
                celda.textContent = contadorPost;
                contadorPost++;
            }else if(i==1){
                celda.textContent = element.title;
            }else if(i==2){
                celda.textContent = element.author;
            }else if(i==3){

                //creo el boton de VER
                let botVer = document.createElement("a");
                botVer.textContent="< VER >";
                botVer.classList.add("ver");
                botVer.setAttribute("href", "visualizador.html?id="+element.id) //nos lleva al post del id concreto
                celda.appendChild(botVer)

               //creo el boton de BORRAR
                let botDel = document.createElement("a");
                botDel.textContent="< BORRAR >";
                //le añado una clase y un id (que sea el mismo del post)
                botDel.classList.add("borrar");
                botDel.id = element.id;
                celda.appendChild(botDel);
            }

            fila.appendChild(celda);    //añado la celda con la info completa a la fila
        }

            cuerpo.appendChild(fila);   //añado la fila al body de la tabla

            //creo una barra para separar un post de otro
            let barra = document.createElement("hr");
            cuerpo.appendChild(barra);
    });



}

function crearCabeceraTabla(){

    for (let i = 0; i < 4; i++){
        let th = document.createElement("th");
        if(i==0){
            th.textContent = "Número"
        }else if(i==1){
            th.textContent = "Título"
        }
        else if(i==2){
            th.textContent = "Autor"
        }
        else if(i==3){
            th.textContent = "Opciones"
        }
        cabecera.appendChild(th);
        tabla.appendChild(cabecera)
    }
}


//ELIMINAR POST
tabla.addEventListener("click", borrarPost);

function borrarPost(event){
    //busca el evento que tenga la clase borrar, para que solo se ejecute en el boton borrar y no en cualquier parte de la tabla
    if(event.target && event.target.matches("a.borrar")){
        event.preventDefault();

        let id = event.target.id; //guardo el id del evento, que es el del post seleccionado

        let urlBorrar =  'http://localhost:3000/posts/'+id;

        fetch(urlBorrar, {method: 'DELETE'})
        .then(response => { //se resuelve la promesa y la pasa a formato json
            if(response.ok){    //poner siempre
            window.location.reload();   //para que la página se recargue y se vea que se ha eliminado
            return response.json();
            }
            return Promise.reject(response) //lanzo un reject que irá al catch más cercano por si la promesa no se ha resuelto
        })
        .catch(err => {
            console.log('Error en la petición HTTP: '+err.message);
          }) //por si hay algún error como que no funcione la conexión o que la url esté mal

        
    }
}


