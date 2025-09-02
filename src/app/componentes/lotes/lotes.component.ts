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
  selector: 'app-lotes',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterModule, HomeAdminComponent],
  templateUrl: './lotes.component.html',
  styleUrl: './lotes.component.css'
})
export class LotesComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private peticion: PeticionService, private cdr: ChangeDetectorRef) { }

  datos: any = {}
  _id: string = ""
  datosLugar: any = {}


  ngOnInit(): void {

    this.iniciar(this.actRoute.snapshot.params["_id"])
    this.cargarLugares()
  }

  misDatos:any= {}


  cargarLugares(){
    let post = {
      host: this.peticion.urlReal,
      path: "/lugares/cargarTodas/" ,
      payload:{}
    }
    this.peticion.get(post.host + post.path).then((res: any) => {
      this.datosLugar = res.datos.datos
    })
  }

  iniciar(identificador: string) {
    let post = {
      host: this.peticion.urlReal,
      path: "/lotes/cargar/" + identificador,
      payload:{}
    }
    this.peticion.get(post.host + post.path).then((res: any) => {
      console.log(res)
      this.misDatos = res[0]
      this.cdr.detectChanges();
    })
  }
}