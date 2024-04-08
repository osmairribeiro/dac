import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { MODEL } from "../shared";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BankAccountService {
  private BASE_URL = env.BASE_URL + "bank-accounts/";
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<MODEL.BankAccount[]> {
    return this.httpClient.get<MODEL.BankAccount[]>(
      this.BASE_URL,
      this.httpOptions
    );
  }

  getByAccountNumber(
    accountNumber: string
  ): Observable<MODEL.BankAccount | null> {
    return this.httpClient
      .get<MODEL.BankAccount[]>(
        `${this.BASE_URL}?accountNumber=${accountNumber}`,
        this.httpOptions
      )
      .pipe(
        map((accounts: MODEL.BankAccount[]) => {
          if (accounts && accounts.length > 0) {
            return accounts[0]; // Retorna a primeira conta encontrada (pode haver mais de uma?)
          }
          return null; // Retorna null se não encontrar nenhuma conta com o número especificado
        }),
        catchError(() => of(null)) // Trata erros da requisição retornando null
      );
  }

  create(bankAccount: MODEL.BankAccount): Observable<MODEL.BankAccount> {
    return this.httpClient.post<MODEL.BankAccount>(
      this.BASE_URL,
      JSON.stringify(bankAccount),
      this.httpOptions
    );
  }

  update(bankAccount: MODEL.Client): Observable<MODEL.BankAccount> {
    return this.httpClient.put<MODEL.BankAccount>(
      this.BASE_URL + bankAccount.id,
      JSON.stringify(bankAccount),
      this.httpOptions
    );
  }

  getAccountByLoggedUser(
    client: string | undefined
  ): Observable<MODEL.BankAccount | null> {
    if (client) {
      return this.httpClient.get<MODEL.BankAccount>(
        `${this.BASE_URL}?client=${client}`,
        this.httpOptions
      );
    }
    return of(null); // Importe 'of' a partir do 'rxjs'
  }

  // Método para obter os clientes das contas do gerente logado
  getClientsOfManagerLogged(managerId: string): Observable<string[]> {
    return this.httpClient
      .get<MODEL.BankAccount[]>(
        `${this.BASE_URL}?manager=${managerId}`,
        this.httpOptions
      )
      .pipe(
        map((accounts: MODEL.BankAccount[]) => {
          const clients: string[] = [];
          accounts.forEach((account) => {
            if (account.client) {
              clients.push(account.client);
            }
          });
          return clients;
        }),
        catchError(() => of([])) // Trata erros da requisição retornando um array vazio
      );
  }

  delete(id: number): Observable<MODEL.BankAccount> {
    return this.httpClient.delete<MODEL.BankAccount>(
      this.BASE_URL + id,
      this.httpOptions
    );
  }
}
