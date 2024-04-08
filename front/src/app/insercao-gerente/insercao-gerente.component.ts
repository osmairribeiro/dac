import { Component } from '@angular/core';
import { Gerente } from './gerente.model';
//import { GerenteService } from './gerente.service';
import { GerenteService } from './gerente.service';
@Component({
  selector: 'app-insercao-gerente',
  standalone: true,
  imports: [],
  templateUrl: './insercao-gerente.component.html',
  styleUrl: './insercao-gerente.component.css'
})
export class InsercaoGerenteComponent {
gerentees: Gerente[]=[];
  inserirGerente(nome: string, cpf: string, email: string, telefone: string){
    const novoGerente= new Gerente(nome, cpf,email,telefone);

  }
}
