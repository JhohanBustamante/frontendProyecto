import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeAdminComponent } from "../home-admin/home-admin.component";

@Component({
  selector: 'app-administracion',
  imports: [FormsModule, RouterLink, HomeAdminComponent],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent implements OnInit{

constructor(private peticion: PeticionService, private router: Router) {}


  nombre: string = "Cargando"
  rol: string = "Cargando"

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
      console.log(res)
      this.nombre = res.nombre
      this.rol = res.rol
      if(this.nombre == undefined || this.nombre==""){
        this.router.navigate(["inicio"])
      }
    })
  }
}
