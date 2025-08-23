import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { HomeAdminComponent } from "../home-admin/home-admin.component";
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
declare var $: any

@Component({
  selector: 'app-registro-lugares',
  imports: [HeaderComponent, FooterComponent, FormsModule, HomeAdminComponent, CommonModule],
  templateUrl: './registro-lugares.component.html',
  styleUrl: './registro-lugares.component.css'
})
export class RegistroLugaresComponent implements OnInit {
  constructor(private peticion: PeticionService, private router: Router) { }

  nombreIniciado: string = "Cargando"
  rolIniciado: string = "Cargando"
  datos: any[] = []

  nombre: string = ""
  rol: string = "Cliente"
  correo: string = ""
  estado: string = "Activo"
  contrasena: string = ""
  idSeleccionado: string = ""

  ngOnInit(): void {
    this.cargarEstado()
    this.cargarTodas()
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
  actualizar(){
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/actualizar",
      payload: {
        _id: this.idSeleccionado,
        nombre: this.nombre,
        correo: this.correo,
        estado: this.estado,
        rol: this.rol,
        contrasena: this.contrasena
      }
    }
    this.peticion.put(post.host + post.path, post.payload).then((res: any) => {
      if (res.estado == true) {
        Swal.fire({
          title: "Bien",
          text: "Usuario actualizado",
          icon: "success",
          draggable: true
        });
        $('#aniadirModal').modal('hide')
        this.cargarTodas()
      } else {
        Swal.fire({
          title: "F",
          text: res.mensaje,
          icon: "error",
          draggable: true
        });
      }
    })
  }

  eliminar(){
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/eliminar",
      payload: {
        _id: this.idSeleccionado,
        nombre: this.nombre,
        correo: this.correo,
        estado: this.estado,
        rol: this.rol,
        contrasena: this.contrasena
      }
    }
    this.peticion.delete(post.host + post.path, post.payload).then((res: any) => {
      if (res.estado == true) {
        Swal.fire({
          title: "Bien",
          text: "Usuario eliminado",
          icon: "success",
          draggable: true
        });
        $('#aniadirModal').modal('hide')
        this.cargarTodas()
      } else {
        Swal.fire({
          title: "F",
          text: res.mensaje,
          icon: "error",
          draggable: true
        });
      }
    })
  }
  agregar() {
    this.limpiar()
    $('#aniadirModal').modal('show')
  }

  cargar(id: string){
    this.idSeleccionado = id
    $('#aniadirModal').modal('show')
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/cargarId/"+ this.idSeleccionado,
      payload: {
      }
    }
    this.peticion.get(post.host + post.path).then((res: any) => {
      if(res.estado = true){
        this.nombre = res.datos.datos.nombre
        this.correo = res.datos.datos.correo
        this.rol = res.datos.datos.rol
        this.estado = res.datos.datos.estado
      }
    })
  }

  guardar() {
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/guardar",
      payload: {
        nombre: this.nombre,
        correo: this.correo,
        estado: this.estado,
        rol: this.rol,
        contrasena: this.contrasena
      }
    }
    this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
      if (res.estado == true) {
        Swal.fire({
          title: "Bien",
          text: "Usuario guardado",
          icon: "success",
          draggable: true
        });
        $('#aniadirModal').modal('hide')
        this.cargarTodas()
      } else {
        Swal.fire({
          title: "F",
          text: res.mensaje,
          icon: "error",
          draggable: true
        });
      }
    })
  }

  limpiar() {
    this.nombre = ""
    this.contrasena = ""
    this.correo = ""
    this.estado = "Inactivo"
    this.rol = "Cliente"
    this.idSeleccionado = ""
  }

  cargarTodas() {
    let post = {
      host: this.peticion.urlReal,
      path: "/usuario/cargarTodas",
      payload: {
      }
    }
    this.peticion.get(post.host + post.path).then((res: any) => {
      console.log(res)
      this.datos = res.datos.datos
    })
  }
}