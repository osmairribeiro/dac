import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { MODEL } from "../shared";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private BASE_URL = env.BASE_URL + "users/";
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<MODEL.Client[]> {
    return this.httpClient.get<MODEL.Client[]>(this.BASE_URL, this.httpOptions);
  }

  getById(id: string): Observable<MODEL.Client> {
    return this.httpClient.get<MODEL.Client>(
      this.BASE_URL + id,
      this.httpOptions
    );
  }

  create(client: MODEL.Client): Observable<MODEL.Client> {
    return this.httpClient.post<MODEL.Client>(
      this.BASE_URL,
      JSON.stringify(client),
      this.httpOptions
    );
  }

  update(client: MODEL.Client): Observable<MODEL.Client> {
    return this.httpClient.put<MODEL.Client>(
      this.BASE_URL + client.id,
      JSON.stringify(client),
      this.httpOptions
    );
  }

  updateStatus(clientId: string, newStatus: string): Observable<MODEL.Client> {
    const url = `${this.BASE_URL}${clientId}`;

    return this.getById(clientId).pipe(
      switchMap((client: MODEL.Client) => {
        const updatedClient = { ...client, status: newStatus }; // Criando um novo objeto com os dados existentes e o novo status
        return this.httpClient.put<MODEL.Client>(
          url,
          updatedClient,
          this.httpOptions
        );
      })
    );
  }

  delete(id: number): Observable<MODEL.Client> {
    return this.httpClient.delete<MODEL.Client>(
      this.BASE_URL + id,
      this.httpOptions
    );
  }
}
