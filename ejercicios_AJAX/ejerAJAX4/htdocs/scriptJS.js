const listadoProvincias = document.getElementById("provincias");
const listadoMunicipios = document.getElementById("municipios");

window.addEventListener("load", (e) =>{
    fetch('http://ejerajax4.loc/cargaProvinciasXML.php')
    .then(response => {
        if(response.ok){
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos => {
        //console.log(datos)

        const parser = new DOMParser(); //creo el objeto parseador
        const xml = parser.parseFromString(datos, "application/xml");

        mostrarProvincias(xml)
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    }) 
})

function mostrarProvincias(xml){
    //console.log("entra a la funcion")

    let provinciasTodo = xml.getElementsByTagName("provincias")[0]; //<provincias>...</provincias>
    let provinciaLista = provinciasTodo.getElementsByTagName("provincia"); //<provincia> ... </provincia> ...
    

    for(i=0; i<provinciaLista.length; i++){
        
        let nombreProvincia = provinciaLista[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;
        //si no pongo el firstChild me aparece un object Element
        //con firstChild me devuelve un Object text y para obtener su valor necesito ponerle nodeValue
        let codigoProvincia = provinciaLista[i].getElementsByTagName("codigo")[0].firstChild.nodeValue;
        // console.log(codigoProvincia)
        // console.log(nombreProvincia)

        //Crear elementos de tipo opción (new Option(nombre, valor)) y añadirlo al array options[] de la lista desplegable.
        listadoProvincias.options[i+1] = new Option(nombreProvincia, codigoProvincia);
    }

}


listadoProvincias.addEventListener("change", (e) =>{
    let provincia = e.target[e.target.selectedIndex].value;//listadoProvincias.options[listadoProvincias.selectedIndex].value;
    //console.log(provincia) muestra el codigo de la provincia seleccionada

    const formData = new FormData();
    formData.append('provincia', provincia)

    fetch('http://ejerajax4.loc/cargaMunicipiosXML.php', {
        body: formData,
        method: 'POST',} )
    .then(response => {
        if(response.ok){
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos => {
        console.log(datos) //esta vacío

        const parser = new DOMParser(); //creo el objeto parseador
        const xml = parser.parseFromString(datos, "application/xml");

        mostrarMunicipiosProvincia(xml)
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    }) 
})


function mostrarMunicipiosProvincia(xml){
    //console.log(xml)

    let municipiosTodo = xml.getElementsByTagName("municipios")[0];
    let municipiosLista = municipiosTodo.getElementsByTagName("municipio");

    for (i=0; i<municipiosLista.length; i++){
        let nombreMunicipio = municipiosLista[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;
        let codigoMunicipio = municipiosLista[i].getElementsByTagName("codigo")[0].firstChild.nodeValue;

        listadoMunicipios.options[i] = new Option(nombreMunicipio, codigoMunicipio);
    }

}


//no carga la lista de municipios