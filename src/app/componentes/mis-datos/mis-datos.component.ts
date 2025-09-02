import { Component, OnInit } from '@angular/core';
import { HomeAdminComponent } from "../home-admin/home-admin.component";
import { PeticionService } from '../../servicios/peticion.service';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-datos',
  imports: [HomeAdminComponent, FormsModule, CommonModule],
  templateUrl: './mis-datos.component.html',
  styleUrl: './mis-datos.component.css'
})
export class MisDatosComponent implements OnInit{

  constructor(private peticion: PeticionService, private router: Router){}

  nombre : string = ""
  correo : string = ""
  rol  : string = ""
  estado : string = ""

  ngOnInit(): void {
      this.cargarMisDatos()
  }

  cargarMisDatos(){
let post = {
      host: this.peticion.urlReal,
      path: "/usuario/datos",
      payload: {
      }
    }
    this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
      this.nombre = res.resultado.datos.nombre
      this.correo = res.resultado.datos.correo
      this.rol = res.resultado.datos.rol
      this.estado = res.resultado.datos.estado
    })}

  cambiarNombre(){
        
        if(this.nombre == "" || this.nombre == undefined || this.nombre == null){
          Swal.fire({
                title: "Ouch",
                text: "Debes indicar un nombre",
                icon: "error",
                draggable: true
              });
        } else {
          let post = {
            host: this.peticion.urlReal,
            path: "/usuario/actualizarDatos",
            payload: {
              nombre: this.nombre
            }
          }
          this.peticion.put(post.host + post.path, post.payload).then((res: any) => {
            if (res.estado == false) {
              Swal.fire({
                title: "Ouch",
                text: res.mensaje,
                icon: "error",
                draggable: true
              });
            } else {
              Swal.fire({
                title: "Bien",
                text: res.mensaje,
                icon: "success",
                draggable: true
              });
              this.cargarMisDatos()
            }
          })
        }
          
      
        }    

}
