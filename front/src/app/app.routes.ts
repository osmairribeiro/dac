import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { GerenteComponent } from './gerente/home/gerente.component';
import { AutocadastroComponent } from './autocadastro/autocadastro.component';
import { ListarMelhoresComponent } from './gerente/listarmelhores/listarmelhores.component';
<<<<<<< HEAD
=======
import { ListarTodosComponent } from './gerente/listartodos/listartodos.component';
>>>>>>> ff91764b54c48e4c57a7cd3ab4abc5c547bac29c

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cliente', component: ClienteComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'gerente', component: GerenteComponent },
    { path: 'autocadastro', component: AutocadastroComponent },
    { path: 'listarmelhores', component: ListarMelhoresComponent },
<<<<<<< HEAD
=======
    { path: 'listartodos', component: ListarTodosComponent },
>>>>>>> ff91764b54c48e4c57a7cd3ab4abc5c547bac29c
];
