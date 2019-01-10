import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { Page404Component } from './page404/page404.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        Page404Component,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbComponent,
    ],
    exports: [
        Page404Component,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbComponent,
    ]
})
export class SharedModule { }
