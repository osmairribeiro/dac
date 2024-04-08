import { Component, OnInit } from "@angular/core";
import { MovimentacaoService } from "../../services/movimentacao.service";
import { AuthService } from "../../services/auth.service";
import { Movimentacao } from "../../shared/models/movimentacao.model";
import { BankAccountService } from "../../services/bank-account.service";

@Component({
  selector: "app-saque",
  templateUrl: "./saque.component.html",
  styleUrls: ["./saque.component.scss"],
})
export class SaqueComponent implements OnInit {
  constructor(
    private movimentacaoService: MovimentacaoService,
    private authService: AuthService,
    private bankAccountService: BankAccountService
  ) {}

  saldoConta: string = "";
  conta: string = "";

  ngOnInit(): void {
    this.getSaldoConta();
    this.getConta();
  }

  fazerSaque(): void {
    const valorSaque = parseFloat(
      (document.getElementById("input-valor") as HTMLInputElement).value
    );

    if (!isNaN(valorSaque)) {
      const saqueNumerico = parseFloat(this.saldoConta);
      if (!isNaN(saqueNumerico)) {
        this.saldoConta = (saqueNumerico - valorSaque).toString();
      } else {
        console.error("Valor do saldo inválido.");
      }
    } else {
      console.error("Valor de saque inválido.");
    }

    const idClienteOrigem = this.authService.getUserIdLogged(); // Obtém o ID do cliente logado

    if (idClienteOrigem) {
      this.bankAccountService.getAccountByLoggedUser(idClienteOrigem).subscribe(
        (conta) => {
          if (conta) {
            const idContaOrigem = conta[0].accountNumber; // Obtém o ID da conta do usuário logado
            console.log("Conta:", idContaOrigem);
            const movimentacao: Movimentacao = {
              data_hora: null,
              tipo: "saque",
              valor: valorSaque.toString(),
              id_conta_origem: idContaOrigem, // Define o ID da conta de onde o saque será feito
              id_conta_destino: null,
              id_cliente_origem: idClienteOrigem, // Utiliza o ID do cliente logado
              id_cliente_destino: null,
            };

            this.movimentacaoService.create(movimentacao).subscribe(
              (result) => {
                // Lidar com a resposta da criação da movimentação
              },
              (error) => {
                // Em caso de erro na criação da movimentação
              }
            );
          } else {
            console.error(
              "Conta bancária não encontrada para o usuário logado."
            );
          }
        },
        (error) => {
          console.error("Erro ao obter conta bancária:", error);
        }
      );
    } else {
      console.error("ID do cliente não encontrado.");
    }
  }

  getSaldoConta() {
    const idClienteOrigem = this.authService.getUserIdLogged();

    if (idClienteOrigem) {
      this.bankAccountService.getAccountByLoggedUser(idClienteOrigem).subscribe(
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
  }

  getConta() {
    const idClienteOrigem = this.authService.getUserIdLogged();

    if (idClienteOrigem) {
      this.bankAccountService.getAccountByLoggedUser(idClienteOrigem).subscribe(
        (conta) => {
          if (conta) {
            this.conta = conta[0].accountNumber; // Atualiza o valor do saldo na variável do componente
            console.log("Conta:", this.conta);
          }
        },
        (error) => {
          console.error("Erro ao obter o numero da conta:", error);
        }
      );
    }
  }
}
