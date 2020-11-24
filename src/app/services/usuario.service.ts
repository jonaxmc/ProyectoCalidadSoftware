import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';


// Model
import { Usuario } from '../models/usuario';


import { ToastrService } from 'ngx-toastr';
import { Login } from '../models/login';
import { isUndefined } from 'util';

@Injectable()
export class UsuarioService {

  usuarioList: AngularFireList<any>;
  selectedUsuario: Usuario = new Usuario();
  selectedLogin: Login = new Login();
  tableName = 'usuarios';
  user:string;
  letraAnimal:string;
  tipoAnimal:string;
 

  id;

 

  constructor(private firebase: AngularFireDatabase, public afAuth: AngularFireAuth,private toastr: ToastrService,private http: HttpClient) { }

  cerrarSesion(){
    return this.afAuth.auth.signOut();
  }

 

  
  registrarUsuario(data:Usuario, profesion,estudio,animal,pais){
    
   console.log(profesion)
   console.log(estudio)
   console.log(animal)
    if((data.cedula && data.nombre && data.apellido && data.ciudad && data.direccion && profesion && estudio && animal
      && data.telefono && data.usuario && data.correo && data.pass && data.confirmPass && pais) == undefined){
      this.toastr.error('Por favor llene todos los campos','Error');
      console.log("LLENAR TODOS LOS CAMPOS")
    }else{
      this.letraAnimal = animal.charAt(0);

    console.log("La letra es: "+this.letraAnimal);
      if(data.pass == data.confirmPass){
        return new Promise((resolve, reject) =>{
          this.afAuth.auth.createUserWithEmailAndPassword(data.correo,data.pass)
          .then( (userData) => {
            
            this.user = this.afAuth.auth.currentUser.uid;
            this.firebase.database.ref('usuarios').child(this.user).push({
              cedula: data.cedula,
              nombre:data.nombre,
              apellido:data.apellido,
              ciudad: data.ciudad,
              direccion: data.direccion,
              telefono: data.telefono,
              usuario: data.usuario,
              correo:data.correo,
              ocupacion: profesion,
              nivelEstudio: estudio,
              tipoAnimal: animal,
              pais:pais,
              fechaNacimiento:data.fechaNacimiento,
              letra:this.letraAnimal
            }).key;
            this.toastr.success('Usuario Registrado','Proceso Exitoso')
            resolve(userData)
          },
          err => {
            reject(err);
            if(err){
              console.log("Email duplicado");
              this.toastr.error('El correo ya existe','Error');
            }
          }
          );
        });

      }else{
        this.toastr.error('Las contraseñas no coinciden','Error');
      }
      
      
    }
    
    
  }

  async login(data:Login){
    const result = await this.afAuth.auth.signInWithEmailAndPassword(data.correo,data.pass).then(
      response =>{
        this.afAuth.auth.currentUser.getIdToken().then(function(jsonwebtoken){
         
          
          localStorage.setItem('token',jsonwebtoken);
          
          
          return jsonwebtoken;
         
        });
        let id = this.afAuth.auth.currentUser.uid;
        localStorage.setItem('idUsuario',id);
        
      }
    ).catch(error => console.log(error))
  }

  getUsuarios(userID:String)
  {
    //return this.usuarioList = this.firebase.list('usuarios');
  
    return this.usuarioList = this.firebase.list('usuarios/'+userID);
  }


  ingresarUsuario(usuario: Usuario)
  {

    this.usuarioList.push({
      nombres: usuario.nombre,
      apellidos: usuario.apellido,
      //location: usuario.location,
      //price: usuario.price
    });
  }

  
}
