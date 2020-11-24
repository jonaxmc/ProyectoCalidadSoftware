import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';

//  Service 
import { UsuarioService } from '../../services/usuario.service';

// Class
import { Usuario } from '../../models/usuario';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioList: Usuario[];
  token;
  usuarioID;
  datos:any;
  letra:string;

 
userID;
  constructor(public afAuth: AngularFireAuth,private usuarioService: UsuarioService,private toastr: ToastrService, private router:Router) {
    this.usuarioID = localStorage.getItem('idUsuario');
   }
  
  ngOnInit() {
  }

  cargarLetra(id){
    return this.usuarioService.getUsuarios(id)
    .snapshotChanges().subscribe(item => {
      this.usuarioList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x[id] = element.key;
        this.usuarioList.push(x as Usuario);
      });

      this.datos = this.usuarioList[0];
      this.letra = this.usuarioList[0].letra;
 

      console.log('Tu nombre es ',this.usuarioList[0].nombre)
      console.log('Tu apellido es ',this.usuarioList[0].apellido)
      console.log('Tu letra es ',this.letra)
      

    });
  }

  onSubmit(loginForm: NgForm)
  {
   
    this.usuarioService.login(loginForm.value)
    .then((res)=>{
      this.userID =this.afAuth.auth.currentUser.uid;
      console.log("Login de inicio es ",this.afAuth.auth.currentUser.uid);
      this.userID = localStorage.getItem('userID');
      this.cargarLetra(this.afAuth.auth.currentUser.uid);
      
      this.router.navigateByUrl('home');
    

      
    }).catch((err)=>{
      this.toastr.error('Correo o contraseña incorrectos','Error');
      console.log(err);
    });
  }

}
