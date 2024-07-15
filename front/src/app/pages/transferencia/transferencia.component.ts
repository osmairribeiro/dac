import { Component, OnInit } from "@angular/core";
import { MovimentacaoService } from "../../services/movimentacao.service";
import { AuthService } from "../../services/auth.service";
import { Movimentacao } from "../../shared/models/movimentacao.model";
import { BankAccountService } from "../../services/bank-account.service";

@Component({
  selector: "app-transferencia",
  templateUrl: "./transferencia.component.html",
  styleUrls: ["./transferencia.component.scss"],
})
export class TransferenciaComponent implements OnInit {
  constructor(
    private movimentacaoService: MovimentacaoService,
    private authService: AuthService,
    private bankAccountService: BankAccountService
  ) {}

  saldoConta: string = "";
  conta: string = "";
  idClienteDestino: string = "";

  ngOnInit(): void {
    this.getSaldoConta();
    this.getConta();
    this.preencherDataEHoraAtuais();
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
          }
        },
        (error) => {
          console.error("Erro ao obter o numero da conta:", error);
        }
      );
    }
  }

  fazerTransferencia(): void {
    const numeroContaDestino = (
      document.getElementById("input-conta") as HTMLInputElement
    ).value;
    const valorDeposito = (
      document.getElementById("input-valor") as HTMLInputElement
    ).value;

    const idClienteOrigem = this.authService.getUserIdLogged(); // Obtém o ID do cliente logado

    if (idClienteOrigem) {
      this.bankAccountService.getAccountByLoggedUser(idClienteOrigem).subscribe(
        (conta) => {
          if (conta) {
            const idContaOrigem = conta[0].accountNumber; // Obtém o ID da conta do usuário logado
            this.bankAccountService
              .getByAccountNumber(numeroContaDestino)
              .subscribe((contaDestino) => {
                if (contaDestino) {
                  this.idClienteDestino = contaDestino.client;
                  const movimentacao: Movimentacao = {
                    data_hora: null,
                    tipo: "transferencia",
                    valor: valorDeposito,
                    id_conta_origem: idContaOrigem, // Define o ID da conta de onde o saque será feito
                    id_conta_destino: numeroContaDestino,
                    id_cliente_origem: idClienteOrigem, // Utiliza o ID do cliente logado
                    id_cliente_destino: this.idClienteDestino,
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
                  // Trate o caso em que a conta não foi encontrada ou não tem cliente associado
                  console.error(
                    "Conta destino não encontrada ou sem cliente associado"
                  );
                }
              });
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

  preencherDataEHoraAtuais() {
    const dataInput = document.getElementById("input-data") as HTMLInputElement;
    const horaInput = document.getElementById("input-hora") as HTMLInputElement;

    const agora = new Date();

    // Formato da data: DD/MM/AAAA
    const dataFormatada = `${agora.getDate().toString().padStart(2, "0")}/${(
      agora.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${agora.getFullYear()}`;

    // Formato da hora: HH:MM
    const horaFormatada = `${agora
      .getHours()
      .toString()
      .padStart(2, "0")}:${agora.getMinutes().toString().padStart(2, "0")}`;

    dataInput.value = dataFormatada;
    horaInput.value = horaFormatada;
  }
}
