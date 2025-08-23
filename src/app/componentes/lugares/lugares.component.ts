import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import { ChangeDetectorRef } from '@angular/core';
import { HomeAdminComponent } from "../home-admin/home-admin.component";


@Component({
  selector: 'app-lugares',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterModule, HomeAdminComponent],
  templateUrl: './lugares.component.html',
  styleUrl: './lugares.component.css'
})
export class LugaresComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private peticion: PeticionService, private cdr: ChangeDetectorRef) { }

  datos: any = {}
  _id: string = ""


  ngOnInit(): void {

    this.iniciar(this.actRoute.snapshot.params["_id"])
    this.cargarTodas()
  }

  misDatos:any= {}

  cargarTodas(){
    let post = {
      host: this.peticion.urlReal,
      path: "/lugares/cargarTodas",
      payload:{}
    }
    this.peticion.get(post.host + post.path).then((res: any) => {
      console.log(res)
      this.datos = res.datos.datos
    })
  }

  iniciar(identificador: string) {
    let post = {
      host: this.peticion.urlReal,
      path: "/lugares/cargar/" + identificador,
      payload:{}
    }
    this.peticion.get(post.host + post.path).then((res: any) => {
      console.log(res)
      this.misDatos = res[0]
      this.cdr.detectChanges();
    })
  }
}