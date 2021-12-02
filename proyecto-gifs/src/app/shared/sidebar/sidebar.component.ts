import { Component, OnInit } from '@angular/core';
import { GifsServiceService } from 'src/app/gifs/service/gifs-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private gifsService: GifsServiceService) { }

  ngOnInit(): void {
  }

  /** método get para poder usar en el ngFor del html que te devuelve el historial del servicio*/
  get historial(): string[]{
    return this.gifsService.historial;
  }


  buscar(termino: string){
    this.gifsService.buscarGifs(termino)
  }



}
