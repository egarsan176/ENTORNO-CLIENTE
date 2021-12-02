import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { SearchGifsInterface, Gif} from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsServiceService {

  private _historial:string [] = []

  private urlBase: string = "https://api.giphy.com/v1/gifs";
  private api_Key: string = "ATPVGoz0PDpVcLuwaZTwrRm3XiGPUAti";

  public resultados : Gif[]= [];

  constructor(private HttpClient : HttpClient) {  //tengo que pasarle al constructor del servicio el objeto de la petición, es como inyectar un servicio en otro servicio
    //console.log("GifsService iniciado") 

    //cargo en el servicio el historial del localStorage para que aparezcan datos al iniciar la página
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];   //por definicion el localStorage devuelve un string o nulo, se pone || [] para que funcione bien si devuelve nulo
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
}

  /**este método devuelve la propiedad privada historial que es un array de string */
  get historial(): string[]{
    return [...this._historial];
  }

  /** este método recibe un string y lo añade al principio del array historial si no existe previamente, 
   * también procesa la petición a la API y la respuesta será el array de resultados
   */
  buscarGifs(query:string){ 

    query = query.trim().toLocaleLowerCase(); //para que si vuelvo a introducir la misma palabra pero en mayúscula no la guarde de nuevo
    
    if(!this._historial.includes(query)){    //no se almacenan valores repetidos

      if (this.historial.length<10) { //solo se almacenan 10 resultados
        this._historial.unshift(query)
      }else{    //si la longitud ya es 10, elimino el último elemento y entonces añado el nuevo
        this._historial.pop();
        this._historial.unshift(query)
      }
      // console.log("Entra al método")
      // console.log(this._historial)

      localStorage.setItem('historial', JSON.stringify(this._historial))  //guardo las busquedas del historial en el localStorage
    }

    const params = new HttpParams()
            .set('api_key', this.api_Key)
            .set('limit', '10')
            .set('q', query );

    // this.HttpClient.get<SearchGifsInterface>(`${this.urlBase}/search?api_key=${this.api_Key}&q=${query}&limit=10`)

    // realizo la petición al objeto HttpClient
    // get<SearchGifsInterface> --> indico que es una petición get y que la respuesta será de ese tipo
    // .subscribe es como el .then de fetch; es el que resuelve la petición y te devuelve la respuesta
    this.HttpClient.get<SearchGifsInterface>(`${this.urlBase}/search`, {params:params})
    .subscribe((resp) =>{
      //console.log(resp);
      this.resultados=resp.data;  //guardo en el array de resultados la respuesta

      localStorage.setItem("resultados", JSON.stringify(this.resultados));    //guardo en el localStorage la lista de resultados
  
    })
 

  }


  
}
