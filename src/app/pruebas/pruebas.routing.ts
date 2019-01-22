import { RouterModule, Router } from '@angular/router';
import { PruebasComponent } from './pruebas.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormularioTemplateComponent } from './formulario-template/formulario-template.component';
import { FormularioReactivoComponent } from './formulario-reactivo/formulario-reactivo.component';

const pruebasRouting = [
    {
        path: 'pruebas',
        component: PruebasComponent,
        children: [
            { path: 'formulario', component: FormularioComponent },
            { path: 'formularioTemplate', component: FormularioTemplateComponent },
            { path: 'formularioReactivo', component: FormularioReactivoComponent },
            { path: '', redirectTo: 'formulario', pathMatch: 'full' },
        ]
    }
];

export const PRUEBAS_ROUTES = RouterModule.forChild(pruebasRouting);
