import { Component, OnInit, Input } from '@angular/core'; //Input, argumento del tag <app-heroe-detalle>
import { Heroe } from '../heroe';

@Component({
  selector: 'app-heroe-detalle',
  templateUrl: './heroe-detalle.component.html',
  styleUrls: ['./heroe-detalle.component.css']
})
export class HeroeDetalleComponent implements OnInit {

	@Input() heroe:Heroe;
  constructor() { }

  ngOnInit() {
  }

}
