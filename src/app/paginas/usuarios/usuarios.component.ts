import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalService } from 'src/app/componets/modal-imagen/modal.service';

declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;
  cantidad = 5;
  totalUsuarios = 0;
  cargando: boolean;

  constructor(public usuarioService: UsuarioService,
    public modalService: ModalService) { }

  ngOnInit() {
    this.cargarUsuarios();
    // Imagenes Modal
    this.modalService.notificacion
      .subscribe(res => this.cargarUsuarios());
  }
  cargarUsuarios() {

    this.cargando = true;
    this.usuarioService.obtenerUsuarios(this.desde)
      .subscribe((res: any) => {
        this.totalUsuarios = res.total;
        this.usuarios = res.usuarios;

        this.cargando = false;
        // MEJORAR
      }, (err => {
        this.cargando = false;
      }));
  }
  siguiente() {
    const desde = this.desde + this.cantidad;
    if (desde >= this.totalUsuarios) {
      return;
    }
    this.desde = desde;
    this.cargarUsuarios();
  }
  anterior() {

    const desde = this.desde - this.cantidad;
    if (desde < 0) {
      return;
    }
    this.desde = desde;
    this.cargarUsuarios();

  }

  buscarUsuario(buscar: string) {

    if (buscar.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuarioService.buscarUsuario(buscar)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });

  }
  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      swal('No puede borrar Usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: ' Esta seguro ?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        console.log(borrar);
        if (borrar) {
          this.usuarioService.borrarUsuario(usuario._id)
            .subscribe((borrado: boolean) => {
              console.log(borrado);
              this.cargarUsuarios();
            });
        }
      });
  }
  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarPerfil(usuario).subscribe();

  }
  mostrarModal(id: string) {
    this.modalService.mostrarModal('usuarios', id);
  }
}
