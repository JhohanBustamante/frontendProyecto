import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-admin',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{

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
