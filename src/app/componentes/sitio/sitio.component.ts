import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-sitio',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './sitio.component.html',
  styleUrl: './sitio.component.css'
})
export class SitioComponent {

}
