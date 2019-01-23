import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/modelos/heroe.model';
import { HeroeService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/componets/modal-imagen/modal.service';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-heroe-m',
  templateUrl: './heroe-m.component.html',
  styles: []
})
export class HeroeMComponent implements OnInit {

  forma: FormGroup;

  constructor(public heroeService: HeroeService, public router: Router,
    public activatedRouter: ActivatedRoute,
    public modalService: ModalService,
    public fb: FormBuilder) {

    this.forma = this.fb.group({
      _id: [null],
      img: [''],
      nombre: ['', [Validators.required]],
      superPoder: ['', [Validators.required]],
      descripcion: ['', Validators.required],
    });

    this.activatedRouter.params.subscribe(params => {
      const id = params['id']; // :id este NOMBRE se definio en RouterModule
      if (id !== 'nuevo') {
        this.cargarHeroeById(id);
      }
    });
  }

  ngOnInit() {

    this.modalService.notificacion
      .subscribe(resp => {
        // Si realizo una mdoficacion de imagen en el modal obtengo la nueva imagen
        this.forma.controls['img'].setValue(resp.heroe.img);
      });
  }

  cargarHeroeById(id: string) {
    this.heroeService.obtenerHeroeById(id)
      .subscribe(heroe => {
        this.forma.patchValue({
          _id: heroe._id,
          nombre: heroe.nombre,
          img: heroe.img,
          superPoder: heroe.superPoder,
          descripcion: heroe.descripcion,
        });
      });
  }
  // Medico y forma estan enlazados tiene los mismos datos
  onSubmit() {

    if (this.forma.invalid) {
      return;
    }
    if (this.forma.controls['_id'].value) { // Actualizar Heroe
      this.heroeService.actualizarHeroe(this.forma.value)
        .subscribe(estado => {
          this.router.navigate(['/materialHeroes']);
        });

    } else {// Crear Heroe
      this.heroeService.crearHeroe(this.forma.value)
        .subscribe(heroe => {
          this.forma.controls['_id'].setValue(heroe._id); // El this.medico ya contiene el nombre y el Hospital, agregamos el id
          this.router.navigate(['/materialHeroe', heroe._id]);
        });
    }
  }
  // Tipo : USUARIOS HEROES
  actualizarImagen() {
    this.modalService.mostrarModal('heroes', this.forma.controls['_id'].value);
  }

}

