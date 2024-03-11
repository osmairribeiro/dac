import { Component, OnInit } from "@angular/core";
import { MovimentacaoService } from "../../services/movimentacao.service";
import { AuthService } from "../../services/auth.service";
import { Movimentacao } from "../../shared/models/movimentacao.model";
import { BankAccountService } from "../../services/bank-account.service";

@Component({
  selector: "app-extrato",
  templateUrl: "./extrato.component.html",
  styleUrls: ["./extrato.component.scss"],
})
export class ExtratoComponent implements OnInit {
  constructor(
    private movimentacaoService: MovimentacaoService,
    private authService: AuthService,
    private bankAccountService: BankAccountService
  ) {}

  movimentacoes: Movimentacao[] = [];
  dataInicio: string = "";
  dataFim: string = "";
  contaOrigem: string = "";
  movimentacoesFiltradas: Movimentacao[] = [];
  dataAtual: string = this.formatarData(new Date().toISOString().slice(0, 10));
  saldoConta: string = "";

  ngOnInit(): void {
    const idClienteLogado = this.authService.getUserIdLogged();

    this.movimentacaoService
      .getByClientId(idClienteLogado)
      .subscribe((movimentacoes) => {
        movimentacoes.sort((a, b) => {
          const dateA = this.convertToDate(a.data_hora);
          const dateB = this.convertToDate(b.data_hora);
          return dateA.getTime() - dateB.getTime();
        });

        console.log(movimentacoes);
        this.movimentacoes = movimentacoes;
      });

    this.obterContaDoUsuarioLogado();

    this.getSaldoConta();
  }

  convertToDate(dateString: string): Date {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    const [hour, minutes, seconds] = timePart.split(":");
    const formattedDate = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;
    return new Date(formattedDate);
  }

  consultarExtrato() {
    const idClienteLogado = this.authService.getUserIdLogged();

    // Verificar se ambas as datas estão preenchidas
    if (this.dataInicio && this.dataFim) {
      // Filtrar as movimentações por intervalo de datas
      this.movimentacaoService
        .getByClientId(idClienteLogado)
        .subscribe((movimentacoes) => {
          this.movimentacoesFiltradas = this.filtrarPorIntervaloDeDatas(
            movimentacoes,
            this.dataInicio,
            this.dataFim
          );

          this.movimentacoesFiltradas.sort((a, b) => {
            const dateA = this.convertToDate(a.data_hora);
            const dateB = this.convertToDate(b.data_hora);
            return dateA.getTime() - dateB.getTime();
          });

          this.movimentacoes = this.movimentacoesFiltradas;
        });
    } else {
      // Se alguma data estiver em branco, avise o usuário ou trate de acordo com a sua lógica
      console.log("Por favor, preencha ambas as datas");
    }
  }

  filtrarPorIntervaloDeDatas(
    movimentacoes: Movimentacao[],
    dataInicio: string,
    dataFim: string
  ): Movimentacao[] {
    const dataInicioObj = new Date(dataInicio);
    const dataFimObj = new Date(dataFim);
    dataFimObj.setDate(dataFimObj.getDate() + 1);

    return movimentacoes.filter((movimentacao) => {
      const movimentacaoDate = this.convertToDate(movimentacao.data_hora);
      return (
        movimentacaoDate >= dataInicioObj && movimentacaoDate <= dataFimObj
      );
    });
  }

  isSaida(movimentacao: Movimentacao, contaOrigem: string): boolean {
    return (
      movimentacao.tipo === "saque" ||
      (movimentacao.tipo === "transferencia" &&
        movimentacao.id_conta_origem === this.contaOrigem)
    );
  }

  isEntrada(movimentacao: Movimentacao): boolean {
    return (
      movimentacao.tipo === "deposito" ||
      (movimentacao.tipo === "transferencia" &&
        movimentacao.id_conta_destino === this.contaOrigem)
    );
  }

  obterContaDoUsuarioLogado(): void {
    const idClienteLogado = this.authService.getUserIdLogged();

    this.bankAccountService
      .getAccountByLoggedUser(idClienteLogado)
      .subscribe((conta) => {
        if (conta) {
          this.contaOrigem = conta[0].accountNumber; // Armazena o número da conta na variável contaOrigem
          console.log("Conta do cliente:", this.contaOrigem);
        } else {
          // Lógica para lidar com a falta de uma conta (se necessário)
        }
      });
  }

  formatarData(data: string): string {
    if (!data) return "";

    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, "0");
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
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

  // Função para formatar o saldo para o formato de moeda (R$)
  formatarSaldo(saldo: string): string {
    const saldoNum = parseFloat(saldo); // Converter string para número
    return saldoNum.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}
