import { Component, OnInit } from '@angular/core';
declare function init_plugins();

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styles: []
})

export class PruebasComponent implements OnInit {
  menu: any[];
  constructor() { }

  ngOnInit() {
    init_plugins();
    this.cargarListaLinks();
  }
  cargarListaLinks() {
    this.menu = [
      {
        link: 'formulario',
        nombre: 'Formulario'
      },
      {
        link: 'formularioTemplate',
        nombre: 'Formulario Template'
      },

      {
        link: 'formularioReactivo',
        nombre: 'Formulario Reactivo'
      },

    ];
  }

}
