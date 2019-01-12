import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {

    console.log('Token guard');

    const token = this._usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expirado(payload.exp);

    if (expirado) {
      swal('Ups Ocurrio un Error', 'Sesión Expirada, Inicie Sesión Nuevamente', 'error');
      this._usuarioService.logout();
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }


  verificaRenueva(fechaExp: number): Promise<boolean> {

    return new Promise((resolve, reject) => {

      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();
      // Renueva token cuando le falta 1 hora para EXPIRAR
      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {

        this._usuarioService.renovarToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });

      }

    });

  }


  expirado(fechaExp: number) {

    const ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }


  }

}
