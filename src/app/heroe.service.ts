import { Injectable } from '@angular/core';
import { Heroe } from './heroe';
import { HEROES } from './heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  constructor() { }

  getHeroes():Heroe[]{
  	return HEROES;
  }
}
