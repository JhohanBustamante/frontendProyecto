import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Inicio } from '../../interface/inicio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(private peticion: PeticionService, private router: Router) { }

  correo: string = ""
  contrasena: string = ""
  estado: boolean = false

  iniciar() {
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/iniciar",
      payload: {
        correo: this.correo,
        contrasena: this.contrasena
      }
    }
    this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
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
        this.router.navigate(["registroLugar"])
      }
    })

  }
}


