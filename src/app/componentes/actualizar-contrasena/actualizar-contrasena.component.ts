import { Component, OnInit } from '@angular/core';
import { HomeAdminComponent } from "../home-admin/home-admin.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-contrasena',
  imports: [HomeAdminComponent, HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './actualizar-contrasena.component.html',
  styleUrl: './actualizar-contrasena.component.css'
})
export class ActualizarContrasenaComponent implements OnInit {

   constructor(private peticion: PeticionService, private router: Router){}

  contrasena: string = ""
  contrasenaDos: string = ""
  nombreIniciado: string = ""
  rolIniciado: string = ""

  ngOnInit(): void {
    this.cargarEstado()
  }
  cargarEstado() {
      let post = {
        host: this.peticion.urlReal,
        path: "/usuario/estado",
        payload: {
        }
      }
      this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
        this.nombreIniciado = res.nombre
        this.rolIniciado = res.rol
        if (this.nombreIniciado == undefined || this.nombreIniciado == "") {
          this.router.navigate(["inicio"])
        }
      })
  }

    cambiarContrasena(){
      
      if(this.contrasena !== this.contrasenaDos || this.contrasena == "" || this.contrasena == undefined || this.contrasena == null){
        Swal.fire({
              title: "Ouch",
              text: "Llena ambos campos, deben coincidir",
              icon: "error",
              draggable: true
            });
      } else {
        let post = {
          host: this.peticion.urlReal,
          path: "/usuario/actualizarContrasena",
          payload: {
            contrasena: this.contrasena
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
              title: "Bienvenido",
              text: res.mensaje,
              icon: "success",
              draggable: true
            });
          }
        })
      }
        
    
      }
  


}
