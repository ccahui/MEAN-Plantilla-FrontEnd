import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: []
})
export class FormularioComponent implements OnInit {

  usuarioForma = new FormGroup({
    'nombre': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'email': new FormControl(''),
    'password': new FormControl(''),
    'password1': new FormControl(''),
    'condiciones': new FormControl(''),

  });
  constructor() {

  }

  ngOnInit() {

  }
  get nombre() {
    return this.usuarioForma.get('nombre');
  }
  onSubmit() {

    console.log(this.usuarioForma.value);
    console.log(this.usuarioForma.valid);
  }

}
