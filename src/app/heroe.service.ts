import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs'; //Datos del Servidor
import { Heroe } from './heroe';
import { HEROES } from './heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  constructor() { }
  //Datos del Servidor
  getHeroes() : Observable <Heroe[]>{
  	return of(HEROES);
  }
}
