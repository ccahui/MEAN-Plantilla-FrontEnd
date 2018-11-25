import { Component, OnInit } from '@angular/core';
import { Heroe } from '../heroe';
import { HeroeService } from '../heroe.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[];
  selectedHeroe: Heroe;
  constructor(private heroeService: HeroeService) { }

  ngOnInit() {
    this.getHeroes();

  }
  // ANSINCRONO
  getHeroes(): void {
    // this.heroes = this.heroeService.getHeroes(); Para OBSERVABLE ASINCRONO
    this.heroeService.getHeroes() // Array devuelto HEROES
      .subscribe(heroesDevuelto => this.heroes = heroesDevuelto);

  }

  seleccionar(heroe: Heroe): void {
    this.selectedHeroe = heroe;
  }



}
