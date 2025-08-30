import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { HomeAdminComponent } from "../home-admin/home-admin.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ɵEmptyOutletComponent } from "../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";
declare var $: any


@Component({
  selector: 'app-admin-lotes',
  imports: [HomeAdminComponent, CommonModule, FormsModule, ɵEmptyOutletComponent],
  templateUrl: './admin-lotes.component.html',
  styleUrl: './admin-lotes.component.css'
})


export class AdminLotesComponent {

  constructor(private actRoute: ActivatedRoute, public peticion: PeticionService, private cdr: ChangeDetectorRef, private router: Router) { }

  

  datos: any
  datosLugar: any
  codigoActual: string = ""
  nombreIniciado: string = "Cargando"
  rolIniciado: string = "Cargando"
  idSeleccionado: string = ""
  random: number = 1

  titulo: string = ""
  metrosCuadrados: number = 0
  precioMetroCuadrado: number = 0
  lugar: string = ""
  descripcion: any
  precio: number = 0
  imagen: string = "iconos/anadir-imagen.png"
  imagenSeleccionada !: File



  misDatos: any = {}


  ngOnInit(): void {
    this.cargarTodas()
    this.cargarTodasLugares()
    this.cargarEstado()
  }


  randomF() {
    this.random = Math.floor(Math.random() * 8999 + 1000)
  }

  subirImagen() {
    console.log(this.idSeleccionado)
    const post = {
      host: this.peticion.urlReal,
      path: "/anexos/productos/" + this.idSeleccionado
    }
    this.peticion.UploadFile(this.imagenSeleccionada, post.host + post.path).subscribe((res: any) => {
      if (res.estado == true) {
        Swal.fire({
          title: "Bien",
          text: res.mensaje,
          icon: "success",
          draggable: true
        });
        this.randomF()
        $('#aniadirModal').modal('hide')
        this.cargarTodas()
      } else {
        Swal.fire({
          title: "Error",
          text: res.error,
          icon: "error",
          draggable: true
        });
      }
    })
  }
  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0]
    this.subirImagen()
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
  actualizar() {
    let post = {
      host: this.peticion.urlReal,
      path: "/lotes/actualizar",
      payload: {
        _id: this.idSeleccionado,
        titulo: this.titulo,
        precioMetroCuadrado: this.precioMetroCuadrado,
        descripcion: this.descripcion,
        metrosCuadrados: this.metrosCuadrados,
        lugar: this.lugar,
        precio: this.precio
      }
    }
    this.peticion.put(post.host + post.path, post.payload).then((res: any) => {
      if (res.estado == true) {
        Swal.fire({
          title: "Bien",
          text: "Lote actualizado",
          icon: "success",
          draggable: true
        });
        $('#aniadirModal').modal('hide')
        this.cargarTodas()
      } else {
        Swal.fire({
          title: "Error",
          text: res.mensaje,
          icon: "error",
          draggable: true
        });
      }
    })
  }

  eliminar() {
    let post = {
      host: this.peticion.urlReal,
      path: "/lotes/eliminar",
      payload: {
        _id: this.idSeleccionado,
      }
    }
    this.peticion.delete(post.host + post.path, post.payload).then((res: any) => {
      if (res.estado == true) {
        Swal.fire({
          title: "Bien",
          text: "Lugar eliminado",
          icon: "success",
          draggable: true
        });
        $('#aniadirModal').modal('hide')
        this.cargarTodas()
      } else {
        Swal.fire({
          title: "Error",
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

  cargar(id: string) {
    this.idSeleccionado = id
    $('#aniadirModal').modal('show')
    let post = {
      host: this.peticion.urlReal,
      path: "/lotes/cargarId/" + this.idSeleccionado,
      payload: {
      }
    }
    this.peticion.get(post.host + post.path).then((res: any) => {
      if (res.estado = true) {
        this.titulo = res.datos.datos.titulo
        this.precioMetroCuadrado = res.datos.datos.precioMetroCuadrado
        this.descripcion = res.datos.datos.descripcion
        this.metrosCuadrados = res.datos.datos.metrosCuadrados
        this.lugar = res.datos.datos.lugar
      }
    })
  }

  guardar() {
    let post = {
      host: this.peticion.urlReal,
      path: "/lotes/guardar",
      payload: {
        _id: this.idSeleccionado,
        titulo: this.titulo,
        precioMetroCuadrado: this.precioMetroCuadrado,
        descripcion: this.descripcion,
        metrosCuadrados: this.metrosCuadrados,
        lugar: this.lugar
      }
    }
    this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
      if (res.estado == true) {
        Swal.fire({
          title: "Bien",
          text: "Lugar guardado",
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
    this.titulo = ""
    this.precioMetroCuadrado = 0
    this.descripcion = ""
    this.metrosCuadrados = 0
    this.precio = 0
    this.lugar = ""
    this.idSeleccionado = ""
    this.imagen = "iconos/predeterminado.png"
  }

  cargarTodas() {
    let get = {
      host: this.peticion.urlReal,
      path: "/lotes/cargarTodas",
    }
    this.peticion.get(get.host + get.path).then((res: any) => {
      this.datos = res.datos.datos;
    })
  }

  cargarTodasLugares(){
    let post = {
      host: this.peticion.urlReal,
      path: "/lugares/cargarTodas",
      payload:{}
    }
    this.peticion.get(post.host + post.path).then((res: any) => {
      console.log(res)
      this.datosLugar = res.datos.datos
    })
  }

}
