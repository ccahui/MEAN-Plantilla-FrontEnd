import { Component, OnInit } from '@angular/core';
import { Heroe } from '../heroe';
import { HeroeService } from '../heroe.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	heroes:Heroe[]; 
  	selectedHeroe:Heroe;
  	constructor(private heroeService:HeroeService) { }

  ngOnInit() {
    this.getHeroes();
  
  }
  
  getHeroes():void{
    this.heroes = this.heroeService.getHeroes();
  }

  seleccionar(heroe: Heroe):void {
    this.selectedHeroe = heroe;
  }



}
