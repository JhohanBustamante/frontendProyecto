import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-lugares',
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './registro-lugares.component.html',
  styleUrl: './registro-lugares.component.css'
})
export class RegistroLugaresComponent implements OnInit {
constructor(private peticion: PeticionService, private router: Router) { }


    titulo: string = ""
    subtitulo: string = ""
    descripcion: string = ""
    listaUno: string = ""
    listaDos: string = ""
    listaTres: string = ""
    listaCuatro: string = ""
    listaCinco: string = ""
    codigo: string = ""

    registrar() {
      let post = {
        host: this.peticion.urlReal,
        path: "/lugares/registrar",
        payload: {
          titulo: this.titulo,
          subtitulo: this.subtitulo,
          descripcion: this.descripcion,
          listaUno: this.listaUno,
          listaDos: this.listaDos,
          listaTres: this.listaTres,
          listaCuatro: this.listaCuatro,
          listaCinco: this.listaCinco,
          codigo: this.codigo,
        }
      }
      this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
        console.log(res)
        if (res.estado == false) {
          Swal.fire({
            title:"Ouch",
            text: res.mensaje,
            icon: "error",
            draggable: true
          });
        } else {
          Swal.fire({
            title: "Bien",
            text: res.mensaje,
            icon: "success",
            draggable: true
          });
        }
      })
    }

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
