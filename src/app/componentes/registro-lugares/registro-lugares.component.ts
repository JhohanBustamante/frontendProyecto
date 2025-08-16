import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { HomeAdminComponent } from "../home-admin/home-admin.component";
import { CommonModule } from '@angular/common';
declare var $: any

@Component({
  selector: 'app-registro-lugares',
  imports: [HeaderComponent, FooterComponent, FormsModule, HomeAdminComponent, CommonModule],
  templateUrl: './registro-lugares.component.html',
  styleUrl: './registro-lugares.component.css'
})
export class RegistroLugaresComponent implements OnInit {
constructor(private peticion: PeticionService, private router: Router) { }

  nombre: string = "Cargando" 
  rol: string = "Cargando"
  datos: any[] = []

  ngOnInit(): void {
    this.cargarEstado()
    this.cargarTodas()
  }

  agregar(){
    $('#aniadirModal').modal('show')
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

  cargarTodas(){
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/cargarTodas",
      payload: {
      }
    }
    this.peticion.get(post.host + post.path).then((res:any)=>{
      this.datos = res.datos.datos
    })
  }
}
