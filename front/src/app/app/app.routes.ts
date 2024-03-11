import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { GerenteComponent } from './gerente/gerente.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'clientes', component: ClienteComponent },
    { path: 'administradores', component: AdminComponent },
    { path: 'gerentes', component: GerenteComponent },
];
