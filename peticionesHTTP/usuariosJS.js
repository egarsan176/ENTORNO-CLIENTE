
//VALIDACIÓN DEL FORMULARIO

const formu = document.querySelector('#addUser');
const boton = document.getElementById('send');

const nombre = document.getElementById('name');
const nombreUsuario = document.getElementById('userName');
const telefono = document.getElementById('phone');
const dni = document.getElementById('dni');
const fechaNac = document.getElementById("dateBirth");
const estado = document.getElementById('status');
const email = document.getElementById('email');
const condiciones = document.getElementById("accept");

const formIsValid = {
    nombre: false,
    nombreUsuario: true,
    telefono: false,
    dni: false,
    fechaNac: false,
    estado: false,
    email: false,
    condiciones: false

}

formu.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
});


//validar nombre
nombre.addEventListener('change', (e) => {

    let regEspacios = /^\s+$/;

    if(e.target.value.trim().length > 2 && !regEspacios.test(e.target.value)){
        formIsValid.nombre = true;
        document.getElementById('name').classList.remove("error");
    }else{
        formIsValid.nombre = false;
        document.getElementById('name').classList.add("error");
    }
})



//validar telefono
telefono.addEventListener('change', (e) => {
    let regTel = /^[6-7]\d{8}$/;

    if(regTel.test(e.target.value)){
        formIsValid.telefono = true;
        document.getElementById('phone').classList.remove("error");
        
    }else{
        formIsValid.telefono = false;
        document.getElementById('phone').classList.add("error");
    }

})


//validar DNI
dni.addEventListener('change', (e) =>{
    let regDNI = /^[1-9][0-9]{7}[A-Z]$/;

    if(regDNI.test(e.target.value)){
        formIsValid.dni = true;
        document.getElementById('dni').classList.remove("error");
    }else{
        formIsValid.dni = false;
        document.getElementById('dni').classList.add("error");
    }
})

// //validar fecha de nacimiento
fechaNac.addEventListener('change', (e) =>{
    let date = new Date();

    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth();

    let dateNow = new Date(year, month+1, day);

    let dateValue = fechaNac.value
    let arrayDate = dateValue.split("-");
    let dateInput = new Date(arrayDate[0], arrayDate[1], arrayDate[2]);

    if (dateInput < dateNow){
        formIsValid.fechaNac = true;
        document.getElementById('dateBirth').classList.remove("error");
    }else{
        formIsValid.fechaNac = false;
        document.getElementById('dateBirth').classList.add("error");
    }
})

// validar estado civil
estado.addEventListener('change', (e) => {
    if(estado.value === ""){
        formIsValid.estado = false;
        document.getElementById('status').classList.remove("error");
    }else{
        formIsValid.estado = true;
        document.getElementById('status').classList.add("error");
    }
})

//validar email
email.addEventListener('change', (e) => {
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(reg.test(e.target.value)){
        formIsValid.email = true;
        document.getElementById('email').classList.remove("error");
    }else{
        formIsValid.email = false;
        document.getElementById('email').classList.add("error");
    }
})


//validar autorizacion
condiciones.addEventListener('change', (e) => {
    if (formIsValid.condiciones = e.target.checked){
        document.getElementById('accept').classList.remove("error");
    }else{
        document.getElementById('accept').classList.add("error");
    }
    formIsValid.condiciones = e.target.checked;
    //si esta marcado eliminamos el atributo disabled, si no lo está lo añade y lo pone activo
    e.target.checked ? boton.removeAttribute('disabled'): boton.setAttribute('disabled', true)
})



const validateForm = () => {
    const formValues = Object.values(formIsValid);
    const valid = formValues.findIndex(value => value == false);

    if(valid == -1){
        //si el formulario pasa toda la validación, me guardo los datos
        enviarDatos();
    }else{
        
        // for (i =0; i<formValues.length;i++){
        //     if(formValues[i] === false){
        //         let indice = i;
        //         formu[indice].style.boxShadow = "0 0 8px #ff0000";
        //     }
            
        // }

        alert("Invalid Form")
    }
}

//guarda en el json los datos del usuario nuevo
function enviarDatos(){

    const newUser = {
        userName: document.getElementById("userName").value,
        fullName: document.getElementById("name").value,
        email: document.getElementById("email").value,
    }

    const peticionDatos = new XMLHttpRequest();
    peticionDatos.open('POST', 'http://localhost:3000/users');
    peticionDatos.setRequestHeader('Content-type', 'application/json'); // Siempre tiene que estar esta línea si se envían datos
    peticionDatos.send(JSON.stringify(newUser)); // Hay que convertir el objeto a una cadena de texto JSON para enviarlo
    peticionDatos.addEventListener('load', function() {
        if(peticionDatos.status===201){
            alert("Se ha registrado con éxito")
        }else{
            alert("error")
        }
    })

}




    
    


    


  