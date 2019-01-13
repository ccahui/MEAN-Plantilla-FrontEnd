import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/modelos/heroe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroeService } from 'src/app/services/service.index';
import { ModalService } from 'src/app/componets/modal-imagen/modal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe;

  constructor(public heroeService: HeroeService, public router: Router,
    public activatedRouter: ActivatedRoute,
    public modalService: ModalService) {

    this.heroe = new Heroe();
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
        this.heroe.img = resp.heroe.img;
      });
  }

  cargarHeroeById(id: string) {
    this.heroeService.obtenerHeroeById(id)
      .subscribe(heroe => {
        this.heroe = heroe;
      });
  }

  // Medico y forma estan enlazados tiene los mismos datos
  guardarHeroe(forma: NgForm) {

    if (forma.invalid) {
      return;
    }
    if (this.heroe._id) { // Actualizar Medico
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(estado => {
          console.log(estado);
          this.router.navigate(['/heroes']);
        });

    } else {// Crear Medico
      this.heroeService.crearHeroe(this.heroe)
        .subscribe(heroe => {
          this.heroe._id = heroe._id; // El this.medico ya contiene el nombre y el Hospital, agregamos el id
          this.router.navigate(['/heroe', heroe._id]);
        });
    }
  }
  // Tipo : USUARIOS HEROES
  actualizarImagen() {
    this.modalService.mostrarModal('heroes', this.heroe._id);
  }

}
