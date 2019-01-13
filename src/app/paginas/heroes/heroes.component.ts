import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/modelos/heroe.model';
import { HeroeService } from 'src/app/services/service.index';
import { ModalService } from 'src/app/componets/modal-imagen/modal.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  total = 0;
  constructor(public heroeService: HeroeService, public modalService: ModalService) { }

  ngOnInit() {
    this.obtenerHeroes();
  }

  obtenerHeroes() {
    this.heroeService.obtenerHeroes()
      .subscribe((res: any) => {
        this.heroes = res.heroes;
        this.total = res.total;
      });
  }

  borrarHeroe(id: string) {

    this.heroeService.borrarHeroe(id)
      .subscribe( // Exito eliminando
        () => this.obtenerHeroes()
      );
  }

  actualizarHeroe(heroe: Heroe) {

    this.heroeService.actualizarHeroe(heroe)
      .subscribe(estadoOk => console.log(estadoOk));

  }

  actualizarImagen(id: string) {
    this.modalService.mostrarModal('heroes', id);
  }

  buscarHeroes(buscar: string) {
    if (buscar.length <= 0) {
      this.obtenerHeroes();
      return;
    }
    this.heroeService.buscarHeroes(buscar)
      .subscribe(heroes => this.heroes = heroes);
  }
}

