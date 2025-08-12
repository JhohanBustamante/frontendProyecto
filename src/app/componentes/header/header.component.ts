import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  constructor(private peticion: PeticionService) { }
  
  nombre: string = ""
  rol: string = ""

  ngOnInit(): void {
    this.cargarEstado()
  }

  cargarEstado(){
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/estado",
      payload: {
      }
    }
    this.peticion.post(post.host + post.path, post.payload).then((res:any)=>{
      this.nombre = res.nombre
      this.rol = res.rol
    })
  }
}