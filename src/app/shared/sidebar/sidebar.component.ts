import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/modelos/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor(public _sidebarService: SidebarService,
    public usuarioService: UsuarioService,
    public router: Router,
    public sidebarService: SidebarService) {
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.sidebarService.cargarMenu();
  }

  buscar(data: string) {
    this.router.navigate(['/busqueda', data]);
  }

}
