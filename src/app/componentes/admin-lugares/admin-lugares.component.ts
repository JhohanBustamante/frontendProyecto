import { ChangeDetectorRef, Component } from '@angular/core';
import { HomeAdminComponent } from "../home-admin/home-admin.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
declare var $: any


@Component({
  selector: 'app-admin-lugares',
  imports: [HomeAdminComponent, CommonModule, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './admin-lugares.component.html',
  styleUrl: './admin-lugares.component.css'
})
export class AdminLugaresComponent {

  constructor(private actRoute: ActivatedRoute, public peticion: PeticionService, private cdr: ChangeDetectorRef, private router: Router) { }

  datos: any = {}
  codigoActual: string = ""
  nombreIniciado: string = "Cargando"
  rolIniciado: string = "Cargando"
  idSeleccionado: string = ""
  random: number = 1

  titulo: string = ""
  subtitulo: string = ""
  descripcion: string = ""
  codigo: string = ""
  resumen: any 
  imagen: string = "iconos/anadir-imagen.png"
  imagenSeleccionada !: File
  misDatos:any= {}


  ngOnInit(): void {

    this.codigoActual = this.actRoute.snapshot.params["codigo"]
    this.cargarTodas()
    this.cargarEstado()
  }


  randomF(){
    this.random = Math.floor(Math.random() * 8999 + 1000)
  }

  subirImagen(){
    console.log(this.idSeleccionado)
    const post = {
      host: this.peticion.urlReal,
      path: "/anexos/productos/" + this.idSeleccionado
    }
    this.peticion.UploadFile(this.imagenSeleccionada, post.host + post.path ).subscribe((res: any)=>{
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
  onFileSelected(event:any){
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
    actualizar(){
      let post = {
        host: this.peticion.urlReal,
        path: "/lugares/actualizar",
        payload: {
          _id: this.idSeleccionado,
          titulo: this.titulo,
          subtitulo: this.subtitulo,
          descripcion: this.descripcion,
          codigo: this.codigo,
          resumen: this.resumen
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
        path: "/lugares/eliminar",
        payload: {
          _id: this.idSeleccionado,
          titulo: this.titulo,
          subtitulo: this.subtitulo,
          descripcion: this.descripcion,
          codigo: this.codigo,
          resumen: this.resumen
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
  
    cargar(id: string){
      this.idSeleccionado = id
      $('#aniadirModal').modal('show')
      let post = {
        host: this.peticion.urlReal,
        path: "/lugares/cargarId/"+ this.idSeleccionado,
        payload: {
        }
      }
      this.peticion.get(post.host + post.path).then((res: any) => {
        if(res.estado = true){
          this.titulo = res.datos.datos.titulo
          this.subtitulo = res.datos.datos.subtitulo
          this.descripcion = res.datos.datos.descripcion
          this.resumen = res.datos.datos.resumen
          this.codigo = res.datos.datos.codigo
        }
      })
    }
  
    guardar() {
      let post = {
        host: this.peticion.urlReal,
        path: "/lugares/guardar",
        payload: {
          titulo: this.titulo,
          subtitulo: this.subtitulo,
          descripcion: this.descripcion,
          codigo: this.codigo,
          resumen: this.resumen,
          imagen: this.imagen
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
      this.subtitulo = ""
      this.descripcion = ""
      this.codigo = ""
      this.resumen = ""
      this.idSeleccionado = ""
      this.imagen = "iconos/anadir-imagen.png"
    }

  cargarTodas(){
    let get = {
      host: this.peticion.urlReal,
      path: "/lugares/cargarTodas",
    }
    this.peticion.get(get.host + get.path).then((res: any) => {
      console.log(res)
      this.datos = res.datos.datos
    })
  }

}
