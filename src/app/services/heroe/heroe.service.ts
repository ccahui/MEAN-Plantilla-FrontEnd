import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICE } from 'src/app/configuraciones/config';
import { map } from 'rxjs/operators';
import { Heroe } from 'src/app/modelos/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  obtenerHeroes() {
    const URL = URL_SERVICE + '/heroe';

    return this.http.get(URL).pipe(
      map(res => res)
    );
  }
  obtenerHeroeById(id: string) {
    const URL = URL_SERVICE + '/heroe/' + id;

    return this.http.get(URL).pipe(
      map((res: any) => res.heroe)
    );
  }
  borrarHeroe(id: string) {
    let URL = URL_SERVICE + '/heroe/' + id;
    URL = URL + '?token=' + this.usuarioService.token; // EL token es del USuario que inicio Session

    return this.http.delete(URL).pipe(
      map((res: any) => {
        swal('Heroe Borrado', res.heroe.nombre, 'success');
        return res.ok;
      })
    );
  }
  crearHeroe(heroe: Heroe) {
    const URL = URL_SERVICE + '/heroe?token=' + this.usuarioService.token;

    return this.http.post(URL, heroe).pipe(
      map((resp: any) => {
        return resp.heroe;
      })
    );
  }
  actualizarHeroe(heroe: Heroe) {

    let URL = URL_SERVICE + '/heroe/' + heroe._id;
    URL = URL + '?token=' + this.usuarioService.token; // Token es del USuario que inicio Session

    return this.http.put(URL, heroe).pipe(
      map((res: any) => {
        swal('Heroe Actualizado ', heroe.nombre, 'success');
        return res.ok;
      })
    );

  }
  buscarHeroes(buscar: string) {
    const URL = URL_SERVICE + '/busqueda/heroes/' + buscar;
    return this.http.get(URL).pipe(
      map((res: any) => {
        return res.heroes;
      })
    );

  }

}

