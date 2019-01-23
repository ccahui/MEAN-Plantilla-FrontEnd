import { Component, OnInit, ViewChild } from '@angular/core';
import { Heroe } from 'src/app/modelos/heroe.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HeroeService } from 'src/app/services/service.index';
import { ModalService } from 'src/app/componets/modal-imagen/modal.service';

@Component({
  selector: 'app-heroes-m',
  templateUrl: './heroes-m.component.html',
  styles: []
})
export class HeroesMComponent implements OnInit {

  heroes: Heroe[] = [];
  dataSource = new MatTableDataSource([]);
  total = 0;
  cargando = true;
  displayedColumns: string[] = ['img', 'nombre', 'superPoder', 'operacion'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public heroeService: HeroeService, public modalService: ModalService) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.modalService.notificacion
      .subscribe(res => this.obtenerHeroes());
    this.obtenerHeroes();
  }

  obtenerHeroes() {

    this.cargando = true;

    this.heroeService.obtenerHeroes()
      .subscribe((res: any) => {
        this.heroes = res.heroes;
        this.total = res.total;
        this.dataSource.data = this.heroes;

        this.cargando = false;
      });
  }

  borrarHeroe(id: string) {

    this.heroeService.borrarHeroe(id)
      .subscribe( // Exito eliminando
        () => this.obtenerHeroes()
      );
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
  // Buscador
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


