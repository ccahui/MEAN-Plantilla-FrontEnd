
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { HeroeComponent } from './heroes/heroe.component';
import { Formulario1Component } from './material/formulario1/formulario1.component';
import { Formulario2Component } from './material/formulario2/formulario2.component';
import { HeroesMComponent } from './material/heroes-m/heroes-m.component';
import { UsuariosMComponent } from './material/usuarios-m/usuarios-m.component';
import { MiMaterialModule } from '../pruebas/mimaterial.module';
import { HeroeMComponent } from './material/heroes-m/heroe-m.component';
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
        BusquedaComponent,
        HeroeComponent,
        Formulario1Component,
        Formulario2Component,
        HeroesMComponent,
        UsuariosMComponent,
        HeroeMComponent,
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
        ReactiveFormsModule,
        MiMaterialModule,
    ]
})
export class PaginasModule { }
