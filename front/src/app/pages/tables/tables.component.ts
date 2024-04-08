import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { BankAccountService } from "../../services/bank-account.service";
import { ClientService } from "../../services/client.service";
import { MODEL } from "../../shared";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  clients: MODEL.Client[] = [];
  clientsOfManager: string[] = [];
  filteredClients: MODEL.Client[] = []; // Adicione esta propriedade

  constructor(
    private authService: AuthService,
    private bankAccountService: BankAccountService,
    private clientService: ClientService
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
            client.status === "pendente"
        );
        console.log("Clientes filtrados do gerente:", this.filteredClients);
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

  // Método para aprovar um cliente
  aprovarCliente(client: MODEL.Client): void {
    // Aqui você faria a lógica para alterar o status do cliente para 'aprovado'
    // Por exemplo, supondo que haja um serviço para atualizar o status:
    if (confirm("Tem certeza que deseja aprovar este cliente?")) {
      this.clientService.updateStatus(client.id, "aprovado").subscribe(
        () => {
          // Atualizar o status localmente
          client.status = "aprovado";
          console.log(`Cliente ${client.name} aprovado com sucesso.`);
          this.buscarContasdoGerente();
          this.getAllClientsOfManager();
        },
        (error) => {
          console.error("Erro ao aprovar cliente:", error);
        }
      );
    }
  }

  // Método para recusar um cliente
  recusarCliente(client: MODEL.Client): void {
    // Aqui você faria a lógica para alterar o status do cliente para 'recusado'
    // Por exemplo, supondo que haja um serviço para atualizar o status:
    if (confirm("Tem certeza que deseja recusar este cliente?")) {
      this.clientService.updateStatus(client.id, "recusado").subscribe(
        () => {
          // Atualizar o status localmente
          client.status = "recusado";
          console.log(`Cliente ${client.name} recusado com sucesso.`);
          this.buscarContasdoGerente();
          this.getAllClientsOfManager();
        },
        (error) => {
          console.error("Erro ao recusar cliente:", error);
        }
      );
    }
  }
}
