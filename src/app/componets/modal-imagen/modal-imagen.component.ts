import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(public subirArchivoService: SubirArchivoService,
    public modalService: ModalService, public usuarioService: UsuarioService) {

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
    // Input de File
    const fileImg: any = document.getElementById('idFile');

    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalService.tipo, this.modalService.id, this.usuarioService.token)
      .then(res => {
        // Vaciar imagen de Modal
        fileImg.value = '';
        this.modalService.ocultarModal();
        // EVENTO que sera enviado a Usuario
        this.modalService.notificacion.emit(res);
      })
      .catch((error: any) => {
        // Esta es una promesa d
        swal(error.mensaje, error.errors.message, 'error');
        fileImg.value = '';
      });


    this.cerrarModal();
  }
}
