import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';
import { HomeAdminComponent } from "../home-admin/home-admin.component";

@Component({
  selector: 'app-contactenos',
  imports: [RouterLink, HeaderComponent, FooterComponent, HomeAdminComponent],
  templateUrl: './contactenos.component.html',
  styleUrl: './contactenos.component.css'
})

export class ContactenosComponent {

}
