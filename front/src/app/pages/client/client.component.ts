import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { MODEL } from "../../shared";
import { BankAccountService } from "../../services/bank-account.service";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {
  client: MODEL.Client | undefined;
  saldoConta: string = "";
  conta: string = "";

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private bankAccountService: BankAccountService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const clientId = params["id"]; // Obtém o ID do cliente da rota
      if (clientId) {
        this.clientService.getById(clientId).subscribe(
          (client: MODEL.Client) => {
            this.client = client; // Define os detalhes do cliente para exibição no template
          },
          (error) => {
            console.error("Erro ao buscar detalhes do cliente:", error);
          }
        );
      }
    });
    this.getConta();
    this.getSaldoConta();
  }

  getSaldoConta() {
    this.route.params.subscribe((params) => {
      const idClienteOrigem = params["id"];

      if (idClienteOrigem) {
        this.bankAccountService
          .getAccountByLoggedUser(idClienteOrigem)
          .subscribe(
            (conta) => {
              if (conta) {
                this.saldoConta = conta[0].saldo; // Atualiza o valor do saldo na variável do componente
                console.log("Saldo:", this.saldoConta);
              }
            },
            (error) => {
              console.error("Erro ao obter o saldo da conta:", error);
            }
          );
      }
    });
  }

  getConta() {
    this.route.params.subscribe((params) => {
      const idClienteOrigem = params["id"];

      if (idClienteOrigem) {
        this.bankAccountService
          .getAccountByLoggedUser(idClienteOrigem)
          .subscribe(
            (conta) => {
              if (conta) {
                this.conta = conta[0].accountNumber; // Atualiza o valor do saldo na variável do componente
              }
            },
            (error) => {
              console.error("Erro ao obter o numero da conta:", error);
            }
          );
      }
    });
  }
}
