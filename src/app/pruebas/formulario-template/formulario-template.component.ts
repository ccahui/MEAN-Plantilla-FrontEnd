import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-formulario-template',
  templateUrl: './formulario-template.component.html',
  styles: []
})
export class FormularioTemplateComponent implements OnInit {

  cargando = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ELEMENT_DATA: any[] = [
    { position: 1, nombre: 'Hydrogen', apellido: 1.0079, email: 'H' },
    { position: 2, nombre: 'Helium', apellido: 4.0026, email: 'He' },
    { position: 3, nombre: 'Lithium', apellido: 6.941, email: 'Li' },
    { position: 4, nombre: 'Beryllium', apellido: 9.0122, email: 'Be' },
    { position: 5, nombre: 'Boron', apellido: 10.811, email: 'B' },
    { position: 6, nombre: 'Carbon', apellido: 12.0107, email: 'C' },
    { position: 7, nombre: 'Nitrogen', apellido: 14.0067, email: 'N' },
    { position: 8, nombre: 'Oxygen', apellido: 15.9994, email: 'O' },
    { position: 9, nombre: 'Fluorine', apellido: 18.9984, email: 'F' },
    { position: 10, nombre: 'Neon', apellido: 20.1797, email: 'Ne' },
  ];
  columnasNombre: string[] = ['position', 'nombre', 'apellido', 'email'];

  dataSource = new MatTableDataSource<any[]>(this.ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource = null;
  }
  cambio() {
    if (this.dataSource === null) {
      this.dataSource = new MatTableDataSource<any[]>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.dataSource = null;
  }

}
