import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { BankAccountService } from "../../services/bank-account.service";
import { ClientService } from "../../services/client.service";
import { MODEL } from "../../shared";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"],
})
export class ClientsComponent implements OnInit {
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
        this.applyFilter();
        console.log("Clientes filtrados do gerente:", this.filteredClients);
      },
      (error) => {
        console.error("Erro ao buscar clientes:", error);
      }
    );
  }

  applyFilter(): void {
    // Lógica para aplicar o filtro de CPF
    if (this.searchCPF) {
      this.filteredClients = this.filteredClients.filter((client) =>
        client.cpf.includes(this.searchCPF)
      );
    }

    // Lógica para aplicar o filtro de Nome
    if (this.searchName) {
      this.filteredClients = this.filteredClients.filter((client) =>
        client.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
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

  searchByCPF(event: any) {
    const cpf = event.target.value;
    // Lógica para filtrar a lista de clientes por CPF
    // Implemente conforme necessário
  }

  searchByName(event: any) {
    const name = event.target.value;
    // Lógica para filtrar a lista de clientes por Nome
    // Implemente conforme necessário
  }
}
