import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, RouterLink, RouterModule, ɵEmptyOutletComponent } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PeticionService } from '../../servicios/peticion.service';
import { ChangeDetectorRef } from '@angular/core';
import { HomeAdminComponent } from "../home-admin/home-admin.component";


@Component({
  selector: 'app-lugares',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ɵEmptyOutletComponent, RouterModule, HomeAdminComponent],
  templateUrl: './lugares.component.html',
  styleUrl: './lugares.component.css'
})
export class LugaresComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private peticion: PeticionService, private cdr: ChangeDetectorRef) { }



  ngOnInit(): void {

    this.codigo = this.actRoute.snapshot.params["codigo"]
    this.iniciar()
  }

  misDatos:any= {}

  iniciar() {
    let get = {
      host: this.peticion.urlReal,
      path: "/lugares/cargar/" + this.codigo,
    }
    this.peticion.get(get.host + get.path).then((res: any) => {
      this.misDatos = res[0]
          console.log(this.misDatos)

      this.cdr.detectChanges();
    })
  }
  codigo: string = ""
}