import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-admin',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {

  constructor(private peticion: PeticionService, private router: Router) { }

  nombre: string = ""
  rol: string = ""

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
      this.nombre = res.nombre
      this.rol = res.rol
    })
  }

  salir() {
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/salir",
      payload: {}
    }
    this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
      if (res.estado == false) {
        Swal.fire({
          title: "Ouch",
          text: "error",
          icon: "error",
          draggable: true
        });
      } else {
        Swal.fire({
          title: "Sesion cerrada",
          text: res.mensaje,
          icon: "success",
          draggable: true
        });
        window.location.reload();
      }
    })

  }
}
