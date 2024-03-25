import { Component, OnInit } from "@angular/core";
<<<<<<< HEAD
import { AuthService } from "../../services/auth.service";
import { ClientService } from "../../services/client.service";
import { Client } from "../../shared/models/client.model";
import { BankAccountService } from "../../services/bank-account.service";
=======
//import { AuthService } from "../../services/auth.service";
//import { ClientService } from "../../services/client.service";
//import { Client } from "../../shared/models/client.model";
//import { BankAccountService } from "../../services/bank-account.service";
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  constructor(
<<<<<<< HEAD
    private authService: AuthService,
    private clientService: ClientService,
    private bankAccountService: BankAccountService
=======
    //private authService: AuthService,
    //private clientService: ClientService,
    //private bankAccountService: BankAccountService
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe
  ) {}

  name: string = "";
  email: string = "";
  cellphone: string = "";
  salary: string = "";
  cpf: string = "";
  limite: number = 0;
  logradouro: string = "";
  bairro: string = "";
  localidade: string = "";
  cep: string = "";
  conta: string = "";
  saldoConta: string = "";
  gerente: string = "";

  ngOnInit() {
    this.getConta();
    this.carregarDados();
  }

  private parseSalaryToNumber(salary: string): number {
    const numberRegex = /[^\d.-]/g; // Expressão regular para remover caracteres não numéricos
    const sanitizedSalary = salary?.replace(numberRegex, ""); // Remove caracteres não numéricos
    return parseFloat(sanitizedSalary) || 0; // Converte para número ou retorna 0 se for inválido
  }

  carregarDados() {
<<<<<<< HEAD
    const idCliente = this.authService.getUserIdLogged();
    this.clientService.getById(idCliente).subscribe((result) => {
=======
    //const idCliente = this.authService.getUserIdLogged();
    /*this.clientService.getById(idCliente).subscribe((result) => {
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe
      this.name = result.name;
      this.email = result.email;
      this.cellphone = result.cellphone;
      this.salary = result.salary.toString(); // Converte o salary para string, se necessário
      this.cpf = result.cpf.toString(); // Converte o cpf para string, se necessário
      this.logradouro = result.address.logradouro;
      this.bairro = result.address.bairro;
      this.localidade = result.address.localidade;
      this.cep = result.address.cep;
      const salaryAsNumber = this.parseSalaryToNumber(this.salary);
      this.limite = salaryAsNumber / 2;
<<<<<<< HEAD
    });
  }

  getConta() {
    const idClienteOrigem = this.authService.getUserIdLogged();

    if (idClienteOrigem) {
      this.bankAccountService.getAccountByLoggedUser(idClienteOrigem).subscribe(
=======
    });*/
  }

  getConta() {
    /*const idClienteOrigem = this.authService.getUserIdLogged();

    if (idClienteOrigem) {
      /*this.bankAccountService.getAccountByLoggedUser(idClienteOrigem).subscribe(
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe
        (conta) => {
          if (conta) {
            this.conta = conta[0].accountNumber;
            this.saldoConta = conta[0].saldo;
            const idGerente = conta[0].manager;
            this.clientService.getById(idGerente).subscribe((result) => {
              this.gerente = result.name;
            });
            console.log("Conta:", this.conta);
          }
        },
        (error) => {
          console.error("Erro ao obter o numero da conta:", error);
        }
      );
<<<<<<< HEAD
    }
  }

  saveChanges() {
    const updatedClient: Client = {
=======
    }*/
  }

  saveChanges() {
    /*const updatedClient: Client = {
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe
      id: this.authService.getUserIdLogged(),
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      cellphone: this.cellphone,
      salary: this.salary,
      address: {
        cep: this.cep,
        logradouro: this.logradouro,
        bairro: this.bairro,
        localidade: this.localidade,
      },
    };

<<<<<<< HEAD
    this.clientService.update(updatedClient).subscribe(
=======
    /*this.clientService.update(updatedClient).subscribe(
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe
      (result) => {
        console.log("Cliente atualizado:", result);
      },
      (error) => {
        console.error("Erro ao atualizar cliente:", error);
        // Lógica para lidar com erros
      }
<<<<<<< HEAD
    );
=======
    );*/
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe
  }
}
