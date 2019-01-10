
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { PaginaComponent } from './pagina.component';
import { TableroComponent } from './tablero/tablero.component';
import { HeroesComponent } from './heroes/heroes.component';
import { PAGES_ROUTES } from './paginas.routing';
import { RouterModule } from '@angular/router';

import {ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../componets/grafico-dona/grafico-dona.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ModalImagenComponent } from '../componets/modal-imagen/modal-imagen.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
    declarations: [
        PaginaComponent,
        TableroComponent,
        HeroesComponent,
        GraficoDonaComponent,
        ConfiguracionesComponent,
        PerfilComponent,
        UsuariosComponent,
        ModalImagenComponent,
        BusquedaComponent
    ],
    exports: [
    ],
    imports: [
        PAGES_ROUTES,
        FormsModule,
        SharedModule,
        RouterModule,
        ChartsModule,
        CommonModule,
        PipesModule,
    ]
})
export class PaginasModule { }
