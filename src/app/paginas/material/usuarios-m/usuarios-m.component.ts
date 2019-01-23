import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/modelos/usuario.model';
import { ModalService } from 'src/app/componets/modal-imagen/modal.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

declare var swal: any;

@Component({
  selector: 'app-usuarios-m',
  templateUrl: './usuarios-m.component.html',
  styles: []
})
export class UsuariosMComponent implements OnInit {

  usuarios: Usuario[] = [];
  dataSource = new MatTableDataSource([]);
  total = 0;
  cargando = true;
  displayedColumns: string[] = ['img', 'email', 'nombre', 'role', 'google', 'operacion'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public usuarioService: UsuarioService, public modalService: ModalService) { }

  ngOnInit() {
    // Imagenes Modal
    this.dataSource.paginator = this.paginator;
    this.modalService.notificacion
      .subscribe(res => this.obtenerUsuarios());
    this.obtenerUsuarios();

  }
  obtenerUsuarios() {
    this.cargando = true;


    this.usuarioService.obtenerUsuariosSinPaginacion().subscribe((res: any) => {
      this.usuarios = res.usuarios;
      this.total = res.total;
      this.dataSource.data = this.usuarios;
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // Buscador
  mostrarModal(id: string) {
    this.modalService.mostrarModal('usuarios', id);
  }
}
