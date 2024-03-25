import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { GerenteComponent } from './gerente/home/gerente.component';
import { AutocadastroComponent } from './autocadastro/autocadastro.component';
import { ListarMelhoresComponent } from './gerente/listarmelhores/listarmelhores.component';
import { ListarTodosComponent } from './gerente/listartodos/listartodos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cliente', component: ClienteComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'gerente', component: GerenteComponent },
    { path: 'autocadastro', component: AutocadastroComponent },
    { path: 'listarmelhores', component: ListarMelhoresComponent },
    { path: 'listartodos', component: ListarTodosComponent },
];
