import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Gerente } from "../../shared/models/gerente.model"; // Importe o caminho correto para a classe Gerente
import { GerenteService } from "../../services/gerente.service";
import * as $ from "jquery";

@Component({
  selector: "app-icons",
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.scss"],
})
export class IconsComponent implements OnInit {
  gerentes: Gerente[] = [];
  gerenteSelecionado: Gerente = {
    id: "",
    name: "",
    email: "",
    cellphone: "",
    cpf: "",
    password: "",
    type: "",
  };
  modalAberta = false;

  @ViewChild("nomeInput") nomeInput: ElementRef<HTMLInputElement>;
  @ViewChild("cpfInput") cpfInput: ElementRef<HTMLInputElement>;
  @ViewChild("emailInput") emailInput: ElementRef<HTMLInputElement>;
  @ViewChild("telefoneInput") telefoneInput: ElementRef<HTMLInputElement>;

  constructor(private gerenteService: GerenteService) {}

  ngOnInit(): void {
    this.atualizarListaGerentes();
  }

  salvarNovoGerente(): void {
    const novoGerente: Gerente = {
      name: this.nomeInput.nativeElement.value,
      cpf: this.cpfInput.nativeElement.value,
      email: this.emailInput.nativeElement.value,
      cellphone: this.telefoneInput.nativeElement.value,
      type: "manager", // Definindo o tipo como 'manager' conforme sua especificação
      // Você pode adicionar outros campos se necessário
    };

    this.gerenteService.create(novoGerente).subscribe(
      (gerenteCriado: Gerente) => {
        // Aqui você pode lidar com o gerente recém-criado, se necessário
        console.log("Novo gerente criado:", gerenteCriado);
        // Limpar os campos após criar o gerente, se desejado
        this.limparCampos();
        this.atualizarListaGerentes();
      },
      (error) => {
        // Tratar erro, se necessário
        console.error("Erro ao criar novo gerente:", error);
      }
    );
  }

  limparCampos(): void {
    this.nomeInput.nativeElement.value = "";
    this.cpfInput.nativeElement.value = "";
    this.emailInput.nativeElement.value = "";
    this.telefoneInput.nativeElement.value = "";
  }

  excluirGerente(gerenteId: string): void {
    if (confirm("Tem certeza que deseja excluir este gerente?")) {
      this.gerenteService.delete(gerenteId).subscribe(
        () => {
          // Se a exclusão for bem-sucedida, atualize a lista de gerentes
          this.atualizarListaGerentes();
        },
        (error) => {
          // Tratar erro, se necessário
          console.error("Erro ao excluir gerente:", error);
        }
      );
    }
  }

  atualizarListaGerentes(): void {
    // Recarregar a lista de gerentes após a exclusão
    this.gerenteService.getAll().subscribe(
      (gerentes: Gerente[]) => {
        // Filtrar os gerentes pelo tipo "manager"
        this.gerentes = gerentes.filter(
          (gerente) => gerente.type === "manager"
        );
      },
      (error) => {
        // Tratar erro, se necessário
        console.error(error);
      }
    );
  }

  abrirModalEditar(gerente: Gerente): void {
    this.gerenteSelecionado = { ...gerente }; // Copia os dados do gerente selecionado para o formulário
    this.modalAberta = true; // Abre a modal
  }

  fecharModal(): void {
    this.modalAberta = false; // Fecha a modal
  }

  salvarEdicao(): void {
    this.gerenteService.update(this.gerenteSelecionado).subscribe(
      () => {
        this.atualizarListaGerentes();
        this.fecharModal(); // Fecha a modal após salvar
      },
      (error) => {
        console.error("Erro ao atualizar gerente:", error);
      }
    );
  }
}
