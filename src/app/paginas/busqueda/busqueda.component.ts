import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/configuraciones/config';
import { Usuario } from 'src/app/modelos/usuario.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  termino: string;
  usuarios: Usuario[] = [];
  cargando:boolean;
  constructor(public activatedRouter: ActivatedRoute, public http: HttpClient) {
  }

  ngOnInit() {

    this.activatedRouter.params
      .subscribe(params => {
        this.termino = params['termino']; // Donde Termino es el nombre definido en Router
        this.buscar(this.termino);
      });
  }
  buscar(termino: string) {

    this.cargando = true;

    const URL = URL_SERVICE + '/busqueda/todo/' + termino;
    this.http.get(URL).pipe(
      map((res: any) => res.usuarios))
      .subscribe((usuarios: any) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });

  }

}
