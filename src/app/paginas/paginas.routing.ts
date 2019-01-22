import { RouterModule, Routes } from '@angular/router';

import { PaginaComponent } from './pagina.component';
import { HeroesComponent } from './heroes/heroes.component';
import { TableroComponent } from './tablero/tablero.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { LoginGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { HeroeComponent } from './heroes/heroe.component';
import { UsuariosMComponent } from './material/usuarios-m/usuarios-m.component';
import { HeroesMComponent } from './material/heroes-m/heroes-m.component';
import { Formulario1Component } from './material/formulario1/formulario1.component';
import { Formulario2Component } from './material/formulario2/formulario2.component';
// Verifica Token

const pagesRoutes: Routes = [
    {
        path: '',
        component: PaginaComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'tablero', component: TableroComponent, data: { titulo: 'Tablero' } },
            { path: 'configuraciones', component: ConfiguracionesComponent, data: { titulo: 'Ajustes de Cuenta' } },
            {
                path: 'perfil',
                component: PerfilComponent,
                canActivate: [VerificaTokenGuard],
                data: { titulo: 'Mi Perfil' }
            },
            { path: '', redirectTo: '/tablero', pathMatch: 'full' },
            {
                path: 'heroes',
                component: HeroesComponent,
                canActivate: [VerificaTokenGuard],
                data: { titulo: 'Héroes' }
            },
            {
                path: 'heroe/:id',
                component: HeroeComponent,
                canActivate: [VerificaTokenGuard],
                data: { titulo: 'Actualizar  Héroe' }
            },
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [AdminGuard, VerificaTokenGuard],
                data: { titulo: 'Usuarios' }
            },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
            // Material Angular
            {
                path: 'materialUsuarios',
                component: UsuariosMComponent,
                canActivate: [AdminGuard, VerificaTokenGuard],
                data: { titulo: 'Usuarios Material' }
            },
            {
                path: 'materialHeroes',
                component: HeroesMComponent,
                canActivate: [AdminGuard, VerificaTokenGuard],
                data: { titulo: 'Heroes Material' }
            },
            { path: 'formulario1', component: Formulario1Component, data: { titulo: 'Formulario1 Material' } },
            {
                path: 'formulario2',
                component: Formulario2Component,
                canActivate: [AdminGuard, VerificaTokenGuard],
                data: { titulo: 'Formulario2 Material' }
            },

        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
