let textoInput = document.querySelector(".lista-input");    //donde se escribe el texto de la tarea
let lista = document.querySelector(".lista-tareas");    //el espacio de ul que contiene los li de las tareas
let formu = document.querySelector(".lista");   //el form que contiene el input y el boton


formu.addEventListener("submit", (e) => {
    e.preventDefault();
    addTarea(textoInput.value); //llamo a la funcion addTarea con el valor del input
})

let contador = 0; //contador para crear las keys diferentes

function addTarea(tarea){
    if(tarea != ""){    //compruebo que la tarea no está en blanco
        
        const tareaNueva = {    //creo un objeto de la tarea
            id : contador,
            name : tarea,
            completed : false
        };
        
        localStorage.setItem(contador, JSON.stringify(tareaNueva)); //almaceno en el LocalStorage la tarea convertida en JSON
        
        textoInput.value= ""; //vuelvo a poner el valor de input a "" para que se borre al meter una tarea
        location.reload();  //actualizo la página para que se vean los cambios
    }
    
   
}


window.addEventListener("load", showLocalStorage);    //para mostrar todas las tareas que existen en el LocalStorage cuando la página se cargue

function showLocalStorage(){

   for(let i = 0; i<localStorage.length;i++){       //recorro la longitud de LocalStorage


        contador++; //aumento el contador

        let key = localStorage.key(i);  //guardo la key del localStorage que coincide con el valor de i
        let tarea = JSON.parse(localStorage.getItem(key))   //la convierto en un objeto para poder acceder a sus propiedades

        let checked = tarea.completed ? 'checked' : null;   //compruebo si el checkbox está marcado o no

        let li = document.createElement("li");
        li.setAttribute('class', 'tarea');
        li.setAttribute('id', tarea.id);    //hago que el id del li sea el mismo que el id de la tarea y a su vez el mismo que la key 

        //añado el li nuevo con el nombre de la tarea, el checkbox y el botón de borrar
        li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>
        ${tarea.name} <button class="delete-button">X</button> `;

        //añado la clase checked si la tarea está completa
        if (tarea.completed === true) {
            li.classList.add('checked');
          }else{
            li.classList.remove('checked');
          }

        lista.append(li);   //añado el li a la lista de todos los li


   }

}

let opcion = false; //para cambiar los estado de la tarea

lista.addEventListener("click", (e) => {    //añado un evento al pulsar en el espacio de los ul que contiene las tareas

    if(e.target.matches('button.delete-button')){   //si el evento es en el boton de borrar

        deleteTarea(e.target.parentElement.getAttribute("id"))  //llamo a la funcion que borra la tarea y le paso el id de la tarea(que es el mismo que el del li)

    }else if(e.target.checked && e.target.type === 'checkbox' ){    //si el evento es en el checkbox
        opcion = true;
        changeEstadoTarea(e.target.parentElement.getAttribute("id"), opcion)    //llamo a la funcion que cambia el estado de la tarea y le paso el id de la tarea(que es el mismo que el del li) y una opcion
    }
    
    
})

function deleteTarea(id){   //funcion que borra una tarea del localStorage

    let tarea = JSON.parse(localStorage.getItem(id))   //cojo la tarea que coincide con esa key, y la convierto en un objeto para poder acceder a sus propiedades
    if(tarea.id == id && tarea.completed == true){  //si coincide el id y la tarea está completa
        localStorage.removeItem(id);
        location.reload();  //se recarga la página para ver que se ha borrado
        
    }

}

function changeEstadoTarea(id, opcion){ //funcion que cambia el estado de la tarea (tarea.completed)

    let tarea = JSON.parse(localStorage.getItem(id))   //cojo la tarea que coincide con esa key, y la convierto en un objeto para poder acceder a sus propiedades

    if(opcion === true){    //si el checked estaba marcado, la opcion se convertia en true
               
        if (tarea.id == id){
            tarea.completed = true; //cambio el estado de la tarea a true
            document.getElementById(id).classList.add('checked')    //añado la clase checked al li que contiene esa tarea

        }
 
        localStorage.setItem(id, JSON.stringify(tarea))     //actualizo el localStorage, usando la misma key y poniendo los nuevos valores
    }
    else{   //la opcion era false si el checked no estaba marcado
        if(tarea.id == id){
            tarea.completed = false;    //cambio el estado de la tarea a false
            document.getElementById(id).classList.remove('checked') //elimino la clase checked al id que contiene la tarea
        }

        localStorage.setItem(id, JSON.stringify(tarea))     //actualizo el localStorage
    }

    }


//localStorage.clear(); //para borrar los elementos del localStorage