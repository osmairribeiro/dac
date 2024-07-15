import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { BankAccountService } from "../../services/bank-account.service";
import { ClientService } from "../../services/client.service";
import { MODEL } from "../../shared";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-signup-validation",
  templateUrl: "./signup-validation.component.html",
  styleUrls: ["./signup-validation.component.scss"],
})
export class SignupValidationComponent implements OnInit {
  clients: MODEL.Client[] = [];
  clientsOfManager: string[] = [];

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
        this.clients = allClients.filter(
          (client) =>
            clientsOfManagerIds.includes(client.id.toString()) &&
            client.status === "pendente"
        );
        console.log("Clientes filtrados do gerente:", this.clients);
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
