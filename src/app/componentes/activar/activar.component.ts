import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activar',
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './activar.component.html',
  styleUrl: './activar.component.css'
})
export class ActivarComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private peticion:PeticionService, private router:Router) { }

  correo: string = ""
  codigo: string = ""

  ngOnInit(): void {
    this.correo = this.actRoute.snapshot.params["correo"]
    this.codigo = this.actRoute.snapshot.params["codigo"]
  }

  activar(){
    let post = {
          host: this.peticion.urlReal,
          path: "/usuario/activar",
          payload: {
            correo: this.correo,
            codigo: this.codigo
          }
        }
        this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
          if (res.estado == false) {
            Swal.fire({
              title: "Ouch",
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
            this.router.navigate(["inicio"])
          }
        })
  }
  
}
