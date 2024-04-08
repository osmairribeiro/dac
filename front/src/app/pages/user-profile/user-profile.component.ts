import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ClientService } from "../../services/client.service";
import { Client } from "../../shared/models/client.model";
import { BankAccountService } from "../../services/bank-account.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private bankAccountService: BankAccountService
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
    const idCliente = this.authService.getUserIdLogged();
    this.clientService.getById(idCliente).subscribe((result) => {
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
    });
  }

  getConta() {
    const idClienteOrigem = this.authService.getUserIdLogged();

    if (idClienteOrigem) {
      this.bankAccountService.getAccountByLoggedUser(idClienteOrigem).subscribe(
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
    }
  }

  saveChanges() {
    const updatedClient: Client = {
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

    this.clientService.update(updatedClient).subscribe(
      (result) => {
        console.log("Cliente atualizado:", result);
      },
      (error) => {
        console.error("Erro ao atualizar cliente:", error);
        // Lógica para lidar com erros
      }
    );
  }
}
