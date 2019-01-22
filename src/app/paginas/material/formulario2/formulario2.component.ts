import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-formulario2',
  templateUrl: './formulario2.component.html',
  styles: []
})
export class Formulario2Component implements OnInit {

  forma: FormGroup;
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(public fb: FormBuilder, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.forma = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.forma.patchValue({
      nombre: this.usuario.nombre,
      email: this.usuario.email,
    });
    if (this.usuario.google) {
      this.forma.controls['email'].disable();
    }
  }
  emailErrorMensaje() {
    // Solo email posee dos tipos de validaciones por tanto:
    if (this.forma.controls['email'].hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return 'Email no valido';
  }

  onSubmit() {

    if (this.forma.invalid) {
      return;
    }

    this.usuario.nombre = this.forma.controls['nombre'].value;
    if (!this.usuario.google) {
      this.usuario.email = this.forma.controls['email'].value;
    }

    this._usuarioService.actualizarPerfil(this.usuario)
      .subscribe();
  }

  // Vista previa de la Imagen
  seleccionImage(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }
  // Sube la imagen al servidor
  cambiarImagen() {

    this._usuarioService.actualizarImagen(this.imagenSubir, this.usuario._id);


  }
}

