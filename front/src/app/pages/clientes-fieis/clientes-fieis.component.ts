import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { BankAccountService } from "../../services/bank-account.service";
import { ClientService } from "../../services/client.service";
import { MODEL } from "../../shared";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-clientes-fieis",
  templateUrl: "./clientes-fieis.component.html",
  styleUrls: ["./clientes-fieis.component.scss"],
})
export class ClientesFieisComponent implements OnInit {
  clients: MODEL.Client[] = [];
  clientsOfManager: string[] = [];
  filteredClients: MODEL.Client[] = []; // Adicione esta propriedade
  searchCPF: string = ""; // Adicione esta propriedade
  searchName: string = "";

  constructor(
    private authService: AuthService,
    private bankAccountService: BankAccountService,
    private clientService: ClientService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buscarContasdoGerente();
    this.getAllClientsOfManager();
  }

  getAllClientsOfManager(): void {
    this.clientService.getAll().subscribe(
      (allClients: MODEL.Client[]) => {
        const clientsOfManagerIds = this.clientsOfManager.map((id) =>
          id.toString()
        );
        this.filteredClients = allClients.filter(
          (client) =>
            clientsOfManagerIds.includes(client.id.toString()) &&
            client.status === "aprovado"
        );

        // Ordena os clientes pelo salário em ordem decrescente
        this.filteredClients.sort((a, b) => {
          return parseFloat(b.salary) - parseFloat(a.salary);
        });

        // Pega apenas os três primeiros clientes (os três maiores salários)
        this.filteredClients = this.filteredClients.slice(0, 3);

        console.log(
          "Três maiores salários dos clientes:",
          this.filteredClients
        );
      },
      (error) => {
        console.error("Erro ao buscar clientes:", error);
      }
    );
  }

  buscarContasdoGerente() {
    const managerId = this.authService.getUserIdLogged();

    if (managerId) {
      this.bankAccountService
        .getClientsOfManagerLogged(managerId)
        .subscribe((clients) => {
          this.clientsOfManager = clients;
          // Aqui você tem acesso aos clientes das contas relacionadas ao gerente logado
          console.log("Clientes do gerente:", this.clientsOfManager);
        });
    }
  }
}
