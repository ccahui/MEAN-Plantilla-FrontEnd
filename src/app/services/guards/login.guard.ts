import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service'; // Si coloca la ruta INDEX produce un error FATAL, servicio.index

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public usuarioServicio: UsuarioService, public router: Router) { }
  canActivate() {
    if (this.usuarioServicio.estaLogueado()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
