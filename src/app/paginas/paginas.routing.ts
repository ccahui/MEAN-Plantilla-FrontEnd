import { RouterModule, Routes } from '@angular/router';

import { PaginaComponent } from './pagina.component';
import { HeroesComponent } from './heroes/heroes.component';
import { TableroComponent } from './tablero/tablero.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { LoginGuard } from '../services/service.index';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PaginaComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'tablero', component: TableroComponent, data: { titulo: 'Tablero' } },
            { path: 'configuraciones', component: ConfiguracionesComponent, data: { titulo: 'Ajustes de Cuenta' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Mi Perfil' } },
            { path: '', redirectTo: '/tablero', pathMatch: 'full' },
            { path: 'heroes', component: HeroesComponent, data: { titulo: 'Heroes' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
