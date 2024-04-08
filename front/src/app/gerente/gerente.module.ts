import { NgModule } from '@angular/core';



import { HomeComponent } from './home/home.component';
import { ListarTodosComponent } from './listartodos/listartodos.component';
/*import { ModalVerClienteComponent } from './ver_cliente/ver_cliente.component';*/
import { ListarMelhoresComponent } from './listarmelhores/listarmelhores.component';




@NgModule({
  declarations: [
    HomeComponent,
    ListarTodosComponent,
    ListarMelhoresComponent,
  ],
})
export class GerenteModule {}