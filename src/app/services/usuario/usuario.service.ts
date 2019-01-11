import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/configuraciones/config';
import { map, catchError } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient,
    public subirArchivoService: SubirArchivoService,
    public router: Router) {
    this.cargarStorage();
  }

  // Funcion Utilizada en el GUARD para redireccionar
  estaLogueado() {
    // this.cargarStorage();
    if (this.token) {
      return true;
    }
    return false;
  }

  renovarToken() {
    const URL = URL_SERVICE + '/login/renuevatoken?token=' + this.token;
    return this.http.get(URL).pipe(
      map((res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        return true;
      }), catchError(err => {
        this.router.navigate(['/login']);
        swal('Ups Ocurrio un Error', 'token', 'error');
        return throwError(err);
      }));
  }
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = null;
      this.usuario = null;
      this.menu = null;
    }
  }
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }


  crearUsuario(usuario: Usuario) {
    const URL = URL_SERVICE + '/usuario';
    return this.http.post(URL, usuario)
      .pipe(
        map((resp: any) => {
          swal('Usuario Creado', usuario.email, 'success');
          return resp.usuario;
        }), catchError(err => {
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        }));
  }
  // Recuedame es opcional
  login(usuario: Usuario, recuedame = false) {

    const url = URL_SERVICE + '/login';
    if (recuedame === true) { // El correo se almacena en el localStorage
      localStorage.setItem('email', usuario.email);
    } else { // Si esta desactivo se remueve
      localStorage.removeItem('email');
    }

    return this.http.post(url, usuario)
      .pipe(
        map((res: any) => {
          // Almacenando en el LocalStorage
          this.guardarStorage(res.id, res.token, res.usuario, res.menu);
          return true;
        }), catchError(err => {
          swal(err.error.mensaje, err.error.errors.error, 'error');
          return throwError(err);
        }));
  }

  loginGoogle(token: string) {
    const URL = URL_SERVICE + '/login/google';

    return this.http.post(URL, { token })
      .pipe(
        map((res: any) => {
          // Almacenando en el LocalStorage
          this.guardarStorage(res.id, res.token, res.usuario, res.menu);
          return true;
        })
      );
  }
  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id'); // Inncesario ?
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }
  actualizarPerfil(usuario: Usuario) {
    let URL = URL_SERVICE + '/usuario/' + usuario._id;
    URL = URL + '?token=' + this.token;

    return this.http.put(URL, usuario).pipe(
      map((res: any) => {

        // this.guardarStorage(res.id, res.token, res.usuario);
        // Funcion Utilizada para PERFIL y MODIFICAR ROLE
        if (usuario._id === this.usuario._id) {
          const usuarioDB = res.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu); // Token ?
        }
        swal('Usuario Actualizado', usuario.nombre, 'success');
        return true;
      }), catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
      }));


  }
  actualizarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id, this.token)
      .then((res: any) => {
        this.usuario.img = res.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);

      }).catch(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
      });
  }
  // Valor por defecto
  obtenerUsuarios(desde: number = 0) {
    const URL = URL_SERVICE + '/usuario?desde=' + desde;
    return this.http.get(URL);
  }

  buscarUsuario(buscar: string) {
    const URL = URL_SERVICE + '/busqueda/usuarios/' + buscar;
    return this.http.get(URL).pipe(
      map((res: any) => {
        return res.usuarios;
      })
    );

  }
  borrarUsuario(id: string) {
    let URL = URL_SERVICE + '/usuario/' + id;
    URL = URL + '?token=' + this.token;
    return this.http.delete(URL).pipe(map(res => {
      swal('Usuario Borrado', 'El usuario a sido eliminado Correctament', 'success');
      return true;
    }), catchError(err => {
      swal(err.error.mensaje, err.error.errors.message, 'error');
      return throwError(err);
    }));
  }
}
