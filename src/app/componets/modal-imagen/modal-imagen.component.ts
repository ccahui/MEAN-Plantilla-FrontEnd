import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(public subirArchivoService: SubirArchivoService,
    public modalService: ModalService) {

  }

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {

      this.imagenSubir = null;
      return;
    }
    // Verificar si es de tipo imagen
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'El archivo Seleccionado no es una Imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    // Ver imagen subida temporalemente
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this.modalService.ocultarModal();
  }
  subirImagen() {

    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalService.tipo, this.modalService.id)
      .then(res => {
        this.modalService.ocultarModal();
        // EVENTO que sera enviado a Usuario
        this.modalService.notificacion.emit(res);

      })
      .catch(err => {
        console.log('error');
      });


    this.cerrarModal();
  }
}
