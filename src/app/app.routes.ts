import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { ActivarComponent } from './componentes/activar/activar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MisionComponent } from './componentes/mision/mision.component';
import { LugaresComponent } from './componentes/lugares/lugares.component';
import { TestComponent } from './componentes/test/test.component';
import { RegistroLugaresComponent } from './componentes/registro-lugares/registro-lugares.component';

export const routes: Routes = [
    { path: "activar/:correo/:codigo", component: ActivarComponent, pathMatch: "full" },
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "home", component: HomeComponent, pathMatch: "full" },
    { path: "registroLugar", component: RegistroLugaresComponent, pathMatch: "full" },
    { path: "contactenos", component: ContactenosComponent, pathMatch: "full" },
    { path: "inicio", component: InicioComponent, pathMatch: "full" },
    { path: "registro", component: RegistroComponent, pathMatch: "full" },
    { path: "mision", component: MisionComponent, pathMatch: "full" },
    { path: "lugares/:codigo", component: LugaresComponent, pathMatch: "full" },
    { path: "test", component: TestComponent, pathMatch: "full" },
];