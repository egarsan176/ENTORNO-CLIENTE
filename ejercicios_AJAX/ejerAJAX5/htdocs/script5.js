const listadoProvincias = document.getElementById("provincias");
const listadoMunicipios = document.getElementById("municipios");

window.addEventListener("load", (e) =>{
    fetch('http://ejerajax5.loc/cargaProvinciasJSON.php')
    .then(response => {
        if(response.ok){
            return response.json();
        }
        return Promise.reject(response);
    })
    .then(datos => {
        //console.log(datos)

        mostrarProvincias(datos)
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    }) 
})

function mostrarProvincias(datos){
    //console.log("entra a la funcion")
    let keys = Object.keys(datos); //como datos es un objeto, conseguimos todas las claves, que serían lso códigos
    let values = Object.values(datos); //por otro lado, todos los valores, que serían los nombres de provincia

    for(i=0; i<keys.length; i++){
        
        let codigoProvincia = keys[i];
        let nombreProvincia = values[i];
        // console.log(codigoProvincia)
        // console.log(nombreProvincia)

        //Crear elementos de tipo opción (new Option(nombre, valor)) y añadirlo al array options[] de la lista desplegable.
        listadoProvincias.options[i+1] = new Option(nombreProvincia, codigoProvincia);
    }

}


listadoProvincias.addEventListener("change", (e) =>{
    let provincia = e.target[e.target.selectedIndex].value;//listadoProvincias.options[listadoProvincias.selectedIndex].value;
    console.log(provincia) //muestra el codigo de la provincia seleccionada

    const formData = new FormData();
    formData.append('provincia', provincia)

    fetch('http://ejerajax5.loc/cargaMunicipiosJSON.php', {
        body: formData,
        method: 'POST',} 
    )
    .then(response => {
        if(response.ok){
            return response.json();
        }
        return Promise.reject(response);
    })
    .then(datos => {
        console.log(datos) 

        mostrarMunicipiosProvincia(datos)
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    }) 
})


function mostrarMunicipiosProvincia(datos){

    let keys = Object.keys(datos); //como datos es un objeto, conseguimos todas las claves, que serían lso códigos
    let values = Object.values(datos); //por otro lado, todos los valores, que serían los nombres de provincia

    for (i=0; i<keys.length; i++){
        let nombreMunicipio = values[i];
        let codigoMunicipio = keys[i];

        listadoMunicipios.options[i] = new Option(nombreMunicipio, codigoMunicipio);
    }

}