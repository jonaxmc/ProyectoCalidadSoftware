import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

//  Service 
import { UsuarioService } from '../../../services/usuario.service';

// Class
import { Usuario } from '../../../models/usuario';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  profesion:string;
  estudio:string;
  animal:string;
  pais:string;

  constructor(private usuarioService: UsuarioService,private toastr: ToastrService,private router:Router) {  }

  ngOnInit() {
    //this.usuarioService.getUsuarios();
    this.resetForm();
  }

  onChangeProfesion(deviceValue) {
    this.profesion=deviceValue;
}
onChangeEstudio(deviceValue) {
  this.estudio=deviceValue;
}
onChangeAnimal(deviceValue) {
  this.animal=deviceValue;
}
onChangePais(deviceValue) {
  this.pais=deviceValue;
}
  onSubmit(usuarioForm: NgForm)
  {
    
    /*this.usuarioService.ingresarUsuario(productForm.value);
    this.resetForm(productForm);
    this.toastr.success('Sucessful Operation', 'Usuario Registrado');*/
    this.usuarioService.registrarUsuario(usuarioForm.value,this.profesion,this.estudio,this.animal,this.pais)
    .then((res)=>{
      this.router.navigateByUrl('login');

      console.log("BIEN");
      console.log(res);
    }).catch((err)=>{
      console.log("MAL");
      console.log(err);
    });
  }

  resetForm(usuarioForm?: NgForm)
  {
    if(usuarioForm != null)
      usuarioForm.reset();
      this.usuarioService.selectedUsuario = new Usuario();
  }

}
