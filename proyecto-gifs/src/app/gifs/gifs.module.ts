import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { FormsModule } from '@angular/forms';
import { GifsServiceService } from './service/gifs-service.service';



@NgModule({
  declarations: [
    GifsPageComponent,
    BusquedaComponent, 
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule   //tiene que estar para poder recuperar los input y usar el ngModel
  ],
  exports: [
    GifsPageComponent
  ],
  providers: [
    GifsServiceService
  ]
})
export class GifsModule { }
