import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  AjustesService,
  SidebarService,
  UsuarioService,
  SubirArchivoService,
  LoginGuard
 } from './service.index';
import { ModalService } from '../componets/modal-imagen/modal.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AjustesService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    ModalService,
    LoginGuard
  ],
  declarations: []
})
export class ServiceModule { }
