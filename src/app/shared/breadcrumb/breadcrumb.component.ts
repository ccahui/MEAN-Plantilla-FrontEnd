import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators'; // Importado parala operaciones PIPE, fue un dolor de cabeza no importar esto
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: []
})
export class BreadcrumbComponent implements OnInit {

  paginaActual: string;


  constructor(private router: Router, public titulo: Title) {
    this.paginaActual = '';
    this.getDataRouter().subscribe(data => {
      this.paginaActual = data.titulo;
      this.titulo.setTitle(this.paginaActual);
    });
  }

  ngOnInit() {
  }
  // Data del ROUTER
  getDataRouter() {
    return this.router.events
      .pipe(filter(evento => evento instanceof ActivationEnd))
      .pipe(filter((evento: ActivationEnd) => evento.snapshot.firstChild === null))
      .pipe(map((evento: ActivationEnd) => evento.snapshot.data));
  }
}
