import { Component, OnInit } from '@angular/core';
import { GifsServiceService } from '../service/gifs-service.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent implements OnInit {

  constructor(private gifsService: GifsServiceService) { }

  ngOnInit(): void {
  }

  /** Este método devuelve el array de resultados del servicio */
  get mostrarGif(){
    return this.gifsService.resultados;
  }

}
