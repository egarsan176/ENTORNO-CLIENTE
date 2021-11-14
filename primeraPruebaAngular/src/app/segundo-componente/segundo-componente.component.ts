import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'segundo-componente',
  templateUrl: './segundo-componente.component.html',
  styleUrls: ['./segundo-componente.component.css']
})
export class SegundoComponenteComponent implements OnInit {

  edad: number;

  constructor() {
    this.edad = 18;
   }

  ngOnInit(): void {
    console.log("Componente ejecutado correctamente");
  }

  aumentarEdad(){
    this.edad++;
  }

  disminuirEdad(){
    this.edad--;
  }

}
