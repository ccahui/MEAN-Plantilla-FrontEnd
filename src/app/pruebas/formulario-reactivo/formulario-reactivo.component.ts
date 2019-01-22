import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-formulario-reactivo',
  templateUrl: './formulario-reactivo.component.html',
  styles: []
})
export class FormularioReactivoComponent implements OnInit {
  forma: FormGroup;
  lenguajes: string[] = [
    'Java', 'Php', 'C#', 'C++'
  ];


  constructor(public fb: FormBuilder) { }

  sonIgualesValidator(control: AbstractControl): { [key: string]: boolean } | null {


    const password = control.get('password').value;
    const password1 = control.get('password1').value;
    if (password !== password1) {
      // Creamos ese error
      control.get('password1').setErrors( {igualPassword: true});
      return { 'password1': true };
    }
    return null;
  }
  ngOnInit() {
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
    console.log(this.forma);
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
    if (this.forma.controls['terminos'].value === false) {
      swal('Terminos y Condiciones', 'Acepte nuestro terminos y condiciones', 'error');
      return;
    }
    console.log(this.forma.value);


  }
}
