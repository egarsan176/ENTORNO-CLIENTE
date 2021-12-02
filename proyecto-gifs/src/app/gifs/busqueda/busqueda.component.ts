import { Component, Input, OnInit } from '@angular/core';
import { GifsServiceService } from '../service/gifs-service.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  busqueda: string = "";

  constructor(private gifsService: GifsServiceService) { }

  ngOnInit(): void {
  }

  addBusqueda(){
    //console.log(this.busqueda)

    //si el campo de búsqueda tiene contenido al darle enter se pasa al servicio
    if(this.busqueda.trim().length>0){

      this.gifsService.buscarGifs(this.busqueda);
    }
    this.busqueda= "";  //limpio el campo al darle enter
  }

}
