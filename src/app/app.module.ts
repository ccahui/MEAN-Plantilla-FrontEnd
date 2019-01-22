import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app-routing.module';

// Modulos

import { PaginasModule } from './paginas/paginas.module';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { RouterModule } from '@angular/router';
import { ServiceModule } from './services/services.module';
import { PruebasModule } from './pruebas/pruebas.module';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PaginasModule,
    FormsModule,
    RouterModule,
    ServiceModule,
    ReactiveFormsModule,
    PruebasModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
