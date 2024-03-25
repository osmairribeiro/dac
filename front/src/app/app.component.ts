import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AutocadastroComponent } from './autocadastro/autocadastro.component';
import { GerenteComponent } from './gerente/home/gerente.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports:[
    RouterOutlet, 
    HomeComponent, 
    AdminComponent,
    ClienteComponent,
    AutocadastroComponent,
    GerenteComponent
  ],
    templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

<<<<<<< HEAD

=======
>>>>>>> ff91764b54c48e4c57a7cd3ab4abc5c547bac29c
export class AppComponent {
  title = 'bantads';
}
