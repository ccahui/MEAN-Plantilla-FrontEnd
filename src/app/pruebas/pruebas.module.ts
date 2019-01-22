import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PruebasComponent } from './pruebas.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PRUEBAS_ROUTES } from './pruebas.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioTemplateComponent } from './formulario-template/formulario-template.component';
import { FormularioReactivoComponent } from './formulario-reactivo/formulario-reactivo.component';

import { MiMaterialModule } from './mimaterial.module';
@NgModule({
  declarations: [
    PruebasComponent,
    FormularioComponent,
    FormularioTemplateComponent,
    FormularioReactivoComponent
  ],
  imports: [
    CommonModule,
    PRUEBAS_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    MiMaterialModule
  ]
})
export class PruebasModule { }
