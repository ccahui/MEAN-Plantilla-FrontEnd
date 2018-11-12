import { Component, OnInit } from '@angular/core';
import { Heroe } from '../heroe';
import { HEROES } from '../heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	heroes:Heroe[]= HEROES; //mi-variable / 
  	selectedHeroe:Heroe;
  	constructor() { }

  ngOnInit() {
  }

  seleccionar(heroe: Heroe):void {
    this.selectedHeroe = heroe;
  }

}
