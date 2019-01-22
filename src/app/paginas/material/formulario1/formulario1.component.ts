import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/modelos/usuario.model';
import swal from 'sweetalert'; // Importando Plugin para mensajes
@Component({
  selector: 'app-formulario1',
  templateUrl: './formulario1.component.html',
  styles: []
})
export class Formulario1Component implements OnInit {

  forma: FormGroup;
  lenguajes: string[] = [
    'Java', 'Php', 'C#', 'C++'
  ];
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;
  hide = true;
  constructor(public fb: FormBuilder, public _usuarioService: UsuarioService) { }

  sonIgualesValidator(control: AbstractControl): { [key: string]: boolean } | null {


    const password = control.get('password').value;
    const password1 = control.get('password1').value;
    if (password !== password1) {
      // Creamos ese error
      control.get('password1').setErrors({ igualPassword: true });
      return { 'password1': true };
    }
    return null;
  }
  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.forma = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      password1: [''],
      terminos: [false]
    }, { validator: this.sonIgualesValidator });

    this.forma.patchValue({
      nombre: 'Test Nombre',
      apellido: 'Test Apellido',
      email: 'test@example.com'
    });
  }
  emailErrorMensaje() {
    // Solo email posee dos tipos de validaciones por tanto:
    if (this.forma.controls['email'].hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return 'Email no valido';
  }
  passwordErrorMensaje() {
    if (this.forma.controls['password'].hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (this.forma.controls['password'].hasError('minlength') || this.forma.controls['password'].hasError('maxlength')) {
      return 'El password debe tener entre 4 a 16 caracteres';
    }
    return;

  }
  onSubmit() {
    if (this.forma.invalid) {
      return;
    }
    if (this.forma.controls['terminos'].value === false) {
      swal('Terminos y Condiciones', 'Acepte nuestro terminos y condiciones', 'error');
      return;
    } else {
      swal('Formulario Valido', 'Datos Guardados correctamente', 'success');
      console.log(this.forma.value);
    }




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
