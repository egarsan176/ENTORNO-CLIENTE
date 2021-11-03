const pendingTasks = document.getElementById('pending-tasks')
const finishedTasks = document.getElementById('finished-tasks')
const doingTasks = document.getElementById('doing-tasks')

//dataTransfer
//setData: Establece la información que queremos compartir
//getData: Establece la información que queremos obtener

pendingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

pendingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

pendingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

doingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

doingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

doingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})


finishedTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

finishedTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

finishedTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})


//OBLIGATORIO, SI NO, NO FUNCIONA
finishedTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

finishedTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    const padre = element.parentNode.id

    let id = e.dataTransfer.getData("text") //te devuelve el id de la tarea

    let estadoNuevo = "finished" 
    
    switch (padre) {
        case 'pending-tasks':
          console.log('pendingTasks');
          finishedTasks.appendChild(pendingTasks.removeChild(element));
          changeEstadoTarea(id, estadoNuevo)
          break;
        case 'doing-tasks':
          console.log('doingTasks');
          finishedTasks.appendChild(doingTasks.removeChild(element));
          changeEstadoTarea(id, estadoNuevo)
          break;
   
      }
    })


doingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

doingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')

    const padre = element.parentNode.id;

    let id = e.dataTransfer.getData("text") //te devuelve el id de la tarea

    let estadoNuevo = "doing" 

    switch(padre){
        case 'pending-tasks':
            console.log('pendingTasks');
            doingTasks.appendChild(pendingTasks.removeChild(element));
            changeEstadoTarea(id, estadoNuevo)
            break;
        case 'finished-tasks':
            console.log('finishedTasks');
            doingTasks.appendChild(finishedTasks.removeChild(element));
            changeEstadoTarea(id, estadoNuevo)
            break;
    }
    
})

pendingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

pendingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')

    const padre = element.parentNode.id;

    let id = e.dataTransfer.getData("text") //te devuelve el id de la tarea que has soltado en este div

    let estadoNuevo = "pending" 

    switch(padre){
        case 'doing-tasks':
            console.log('doingTasks');
            pendingTasks.appendChild(doingTasks.removeChild(element));
            changeEstadoTarea(id, estadoNuevo)
            break;
        case 'finished-tasks':
            console.log('finishedTasks');
            pendingTasks.appendChild(finishedTasks.removeChild(element));
            changeEstadoTarea(id, estadoNuevo)
            break;
    }
    
})



//ALMACENAR EN LOCAL STORAGE

let container = document.querySelector(".container");

let boton = document.querySelector(".lista");
let textoInput = document.querySelector(".lista-input"); 

boton.addEventListener("submit", (e) => {
    e.preventDefault();
    addTarea(textoInput.value);
})

let contador = 1;
let idTarea = "task-"

function addTarea(tarea){

    if(tarea != ""){

        const tareaNueva = {
            id: idTarea+contador,
            name: tarea,
            status: 'pending'
        };

        localStorage.setItem(tareaNueva.id, JSON.stringify(tareaNueva));
        
        textoInput.value = "";
        location.reload();
    }
}

window.addEventListener("load", showLocalStorage);

function showLocalStorage(){
    for(let i = 0; i < localStorage.length; i++ ){

        contador++;

        let key = localStorage.key(i);  //guardo la key del localStorage que coincide con el valor de i
        let tarea = JSON.parse(localStorage.getItem(key))   //la convierto en un objeto para poder acceder a sus propiedades
    
    
        let div = document.createElement("div");
        div.classList.add("task");
        div.setAttribute("draggable", "true");
        div.setAttribute("id", tarea.id);
        div.textContent = tarea.name;

        if(tarea.status == "pending"){
            pendingTasks.append(div);
        }
        else if(tarea.status == "doing" ){
            doingTasks.append(div);
        }
        else if(tarea.status == "finished"){
            finishedTasks.append(div);
        }
    
    }
}


function changeEstadoTarea(id, estadoNuevo){

    let tarea = JSON.parse(localStorage.getItem(id));
    tarea.status = estadoNuevo;

    localStorage.setItem(id, JSON.stringify(tarea))

}


//PARA ELIMINAR TAREAS FINALIZADAS A LA PAPELERA

let papelera = document.querySelector(".papelera");

papelera.addEventListener('dragover', (e) => {
    e.preventDefault()
})

papelera.addEventListener("drop", (e) => {

    e.preventDefault();

    let element = document.getElementById(e.dataTransfer.getData('text'));
    element.classList.remove('active');

    let padre = element.parentNode.id;
    let id = e.dataTransfer.getData("text") //te devuelve el id de la tarea que has soltado en este div
    
    if( padre == 'finished-tasks'){

         console.log('finishedTasks');
         finishedTasks.removeChild(element);

         deleteTarea(id);
    }   

})

function deleteTarea(id){
    let tarea = JSON.parse(localStorage.getItem(id));

    if (tarea.status == "finished"){
        localStorage.removeItem(id);
        location.reload();
    }
}