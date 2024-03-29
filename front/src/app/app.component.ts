import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AutocadastroComponent } from './autocadastro/autocadastro.component';
import { GerenteComponent } from './gerente/gerente.component';

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

export class AppComponent {
  title = 'bantads';
}
