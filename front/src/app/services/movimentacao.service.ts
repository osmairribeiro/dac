import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { environment as env } from "src/environments/environment";
import { MODEL } from "../shared";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MovimentacaoService {
  private BASE_URL = env.BASE_URL + "movimentacoes/";
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<MODEL.Movimentacao[]> {
    return this.httpClient.get<MODEL.Movimentacao[]>(
      this.BASE_URL,
      this.httpOptions
    );
  }

  getById(id: string): Observable<MODEL.Movimentacao> {
    return this.httpClient.get<MODEL.Movimentacao>(
      this.BASE_URL + id,
      this.httpOptions
    );
  }

  getByClientId(idCliente: string): Observable<MODEL.Movimentacao[]> {
    const fromOrigem$ = this.httpClient.get<MODEL.Movimentacao[]>(
      `${this.BASE_URL}?id_cliente_origem=${idCliente}`,
      this.httpOptions
    );

    const fromDestino$ = this.httpClient.get<MODEL.Movimentacao[]>(
      `${this.BASE_URL}?id_cliente_destino=${idCliente}`,
      this.httpOptions
    );

    return forkJoin([fromOrigem$, fromDestino$]).pipe(
      map(([fromOrigem, fromDestino]) => {
        // Combinar e retornar as movimentações de ambos os resultados
        return [...fromOrigem, ...fromDestino];
      })
    );
  }

  create(movimentacao: MODEL.Movimentacao): Observable<MODEL.Movimentacao> {
    return this.httpClient.post<MODEL.Movimentacao>(
      this.BASE_URL,
      JSON.stringify(movimentacao),
      this.httpOptions
    );
  }

  update(movimentacao: MODEL.Movimentacao): Observable<MODEL.Movimentacao> {
    return this.httpClient.put<MODEL.Movimentacao>(
      this.BASE_URL + movimentacao.id,
      JSON.stringify(movimentacao),
      this.httpOptions
    );
  }

  delete(id: string): Observable<MODEL.Movimentacao> {
    return this.httpClient.delete<MODEL.Movimentacao>(
      this.BASE_URL + id,
      this.httpOptions
    );
  }
}
