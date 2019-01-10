import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/configuraciones/config';
@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }
  // Donde tipo usuarios medicos hospitales
  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen Subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo al subir la imagen');
            reject(xhr.response);
          }
        }
      };

      const URL = URL_SERVICE + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', URL, true);
      xhr.send( formData );
    });
  }
}
