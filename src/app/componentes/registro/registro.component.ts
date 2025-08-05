import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [FooterComponent, HeaderComponent, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(private peticion: PeticionService, private router: Router) { }

  nombre: string = ""
  apellido: string = ""
  correo: string = ""
  contrasena: string = ""
  cedula: string = ""

  registrar() {
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/registrar",
      payload: {
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        contrasena: this.contrasena,
        cedula: this.cedula
      }
    }
    this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
      if (res.estado == false) {
        Swal.fire({
          title:"Ouch",
          text: res.mensaje,
          icon: "error",
          draggable: true
        });
      } else {
        Swal.fire({
          title: "Correo enviado, revisa tu bandeja",
          text: res.mensaje,
          icon: "success",
          draggable: true
        });
        this.router.navigate(["inicio"])
      }
    })
  }
}
