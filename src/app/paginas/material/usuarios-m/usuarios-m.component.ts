import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/modelos/usuario.model';
import { ModalService } from 'src/app/componets/modal-imagen/modal.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios-m',
  templateUrl: './usuarios-m.component.html',
  styles: []
})
export class UsuariosMComponent implements OnInit {

  usuarios: Usuario[] = [];
  total = 0;

  displayedColumns: string[] = ['img', 'email', 'nombre', 'role', 'google', 'operacion'];

  constructor(public usuarioService: UsuarioService, public modalService: ModalService) { }

  ngOnInit() {
    // Imagenes Modal
    this.modalService.notificacion
      .subscribe(res => this.obtenerUsuarios());
    this.obtenerUsuarios();

  }
  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe((res: any) => {
      this.usuarios = res.usuarios;
      this.total = res.total;
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
        if (borrar) {
          this.usuarioService.borrarUsuario(usuario._id)
            .subscribe((borrado: boolean) => {
              this.obtenerUsuarios();
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
