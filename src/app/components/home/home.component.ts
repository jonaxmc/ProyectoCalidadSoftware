import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarioList: Usuario[];

  array:any;

  datos:any;

  nombre:string;
  apellido:string;
  letra: string;

  token;
  usuarioID;
  //id:string;

  usuarios: Observable<any>;
  ejemplo: any;

  constructor(private usuarioService: UsuarioService,private firebase: AngularFireDatabase, public afAuth: AngularFireAuth,private router:Router) { 
    this.token = localStorage.getItem('token');
    this.usuarioID = localStorage.getItem('idUsuario');

  }

  ngAfterViewInit(){
    
    return this.usuarioService.getUsuarios(this.usuarioID)
    .snapshotChanges().subscribe(item => {
      this.usuarioList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x[this.usuarioID] = element.key;
        this.usuarioList.push(x as Usuario);
      });

      this.datos = this.usuarioList[0];
      this.nombre = this.usuarioList[0].nombre;
      this.apellido = this.usuarioList[0].apellido;
      this.letra = this.usuarioList[0].letra;

      

    });
  }

  ngOnInit() {

/*
      return this.usuarioService.getUsuarios(this.usuarioID)
      .snapshotChanges().subscribe(item => {
        this.usuarioList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x[this.usuarioID] = element.key;
          this.usuarioList.push(x as Usuario);
        });

        this.datos = this.usuarioList[0];
        this.nombre = this.usuarioList[0].nombre;
        this.apellido = this.usuarioList[0].apellido;

        console.log('Tu nombre es ',this.usuarioList[0].nombre)
        console.log('Tu apellido es ',this.usuarioList[0].apellido)

      });
      
    */
 
    
  }

  async cerrarS(){
    
    await this.afAuth.auth.signOut().then(function(){
      this.token = localStorage.removeItem('token');
      this.usuarioID = localStorage.removeItem('idUsuario');
      console.log("Sesion cerrada");
      
    }).catch(function(){})

    this.router.navigateByUrl('login');

  }

  

}
