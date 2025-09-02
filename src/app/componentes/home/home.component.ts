import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, RouterLink, HomeAdminComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

    constructor(private peticion: PeticionService, private cdr: ChangeDetectorRef) { }

  datos: any = {}
  _id: string = ""

  ngOnInit(): void {
    this.cargarTodas()
  }
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
}