import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListarTodosComponent } from './listartodos/listartodos.component';
import { ListarMelhoresComponent } from './listarmelhores/listarmelhores.component';

export const GerenteRoutes: Routes = [
  {
    path: 'gerente',
    component: HomeComponent,
    data: {
      expectedRole: 'GERENTE',
    },
  },
  {
    path: 'gerente/home',
    component: HomeComponent,
    data: {
      expectedRole: 'GERENTE',
    },
  },
  {
    path: 'gerente/listar-todos',
    component: ListarTodosComponent,
    data: {
      expectedRole: 'GERENTE',
    },
  },
  {
    path: 'gerente/listar-melhores',
    component: ListarMelhoresComponent,
    data: {
      expectedRole: 'GERENTE',
    },
  },
];