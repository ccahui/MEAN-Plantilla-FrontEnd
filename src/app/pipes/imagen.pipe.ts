import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../configuraciones/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let URL = URL_SERVICE + '/imagenes';

    if (!img) { // Img = null || img = ''
      return URL + '/usuarios/abcde'; // El servidor me retorna NO-IMAGE.jpeg
    }
    if (img.indexOf('https') >= 0) { // Imagen de Google
      return img;
    }

    switch (tipo) {
      case 'usuario':
        URL = URL + '/usuarios/' + img;
        break;
      default:
        console.log('Tipo de Imagen no Existe PIPE, usuario medico hospital');
        URL = '/usuarios/abcde';

    }
    return URL;
  }

}
