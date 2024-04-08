import { Injectable } from "@angular/core";
import { Gerente } from "./gerente.model";
@Injectable({providedIn:'root',})
 export class GerenteService {
  private gerentes: Gerente[]=[];
  constructor() {

  }
public inseriGerente(gerente: Gerente){
  this.gerentes.push(gerente);
}

 }
