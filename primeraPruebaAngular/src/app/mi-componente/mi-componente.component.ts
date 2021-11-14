import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-componente',
  templateUrl: './mi-componente.component.html',
  styleUrls: ['./mi-componente.component.css']
})

export class MiComponenteComponent implements OnInit {

  visibleSaludo = false;
  visibleTabla = false;
  saludar(){
    this.visibleSaludo = true;
  }
  mostrarTabla(){
    this.visibleTabla = true;
  }

  constructor() { 
  }

  ngOnInit(): void {
  }

}
