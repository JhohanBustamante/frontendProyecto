import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { PruebaPipe } from '../../pipes/prueba.pipe';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, RouterLink, PruebaPipe, HomeAdminComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
}