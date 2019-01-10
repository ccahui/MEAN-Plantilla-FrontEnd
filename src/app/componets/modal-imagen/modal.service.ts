import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  tipo: string; // El tipo de Imagen Usuario Medico Hospital
  id: string; // Id de un Usuario Medico u Hospital
  estado = 'oculto';

  public notificacion = new EventEmitter<any>();
  constructor() { }

  mostrarModal(tipo: string, id: string) {
    this.estado = '';
    this.tipo = tipo;
    this.id = id;
  }
  ocultarModal() {
    this.tipo = null;
    this.id = null;
    this.estado = 'oculto';

 }
}
