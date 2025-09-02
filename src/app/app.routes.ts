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
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component';
import { MisDatosComponent } from './componentes/mis-datos/mis-datos.component';
import { ActualizarContrasenaComponent } from './componentes/actualizar-contrasena/actualizar-contrasena.component';
import { AdminLugaresComponent } from './componentes/admin-lugares/admin-lugares.component';
import { AdminLotesComponent } from './componentes/admin-lotes/admin-lotes.component';
import { LotesComponent } from './componentes/lotes/lotes.component';

export const routes: Routes = [
    { path: "activar/:correo/:codigo", component: ActivarComponent, pathMatch: "full" },
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "home", component: HomeComponent, pathMatch: "full" },
    { path: "registroLugar", component: RegistroLugaresComponent, pathMatch: "full" },
    { path: "contactenos", component: ContactenosComponent, pathMatch: "full" },
    { path: "inicio", component: InicioComponent, pathMatch: "full" },
    { path: "registro", component: RegistroComponent, pathMatch: "full" },
    { path: "mision", component: MisionComponent, pathMatch: "full" },
    { path: "lugares/:_id", component: LugaresComponent, pathMatch: "full" },
    { path: "test", component: TestComponent, pathMatch: "full" },
    {path: "admin", component: HomeAdminComponent, pathMatch: "full"},
    {path: "misDatos", component: MisDatosComponent, pathMatch: "full"},
    {path: "actualizarCont", component: ActualizarContrasenaComponent, pathMatch: "full"},
    {path: "adminLugares", component: AdminLugaresComponent, pathMatch: "full"},
    {path: "adminLotes", component: AdminLotesComponent, pathMatch: "full"},
    { path: "lotes/:_id", component: LotesComponent, pathMatch: "full" },

];