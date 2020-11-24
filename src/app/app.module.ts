import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { app_routing } from './app.routes'; 
import { HttpClientModule } from '@angular/common/http';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';


import { UsuarioService } from './services/usuario.service';

// Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


import { AutenticacionService} from './services/autenticacion.service';




@NgModule({
  declarations: [
    AppComponent,

    UsuariosComponent,
    UsuarioComponent,
    HomeComponent,
    LoginComponent,
 
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    app_routing,




  ],
  providers: [

    UsuarioService,
    AngularFireAuth,
    AutenticacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
