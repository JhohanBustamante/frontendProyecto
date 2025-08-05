import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { PruebaPipe } from '../../pipes/prueba.pipe';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, RouterLink, PruebaPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
}