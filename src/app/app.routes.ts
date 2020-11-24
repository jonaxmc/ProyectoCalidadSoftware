import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { AutenticacionService } from './services/autenticacion.service';

const app_routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AutenticacionService]},
    { path: 'login', component: LoginComponent},
    //{ path: 'registro', component: RegistroComponent},
    { path: 'registro', component: UsuarioComponent},
    { path: '**', pathMatch:'full', redirectTo:'home'}

];

export const app_routing = RouterModule.forRoot(app_routes);