import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
//import { environment as env } from "src/environments/environment.prod";
import { environment as env  } from "../../environments/environment";
import { MODEL } from "../shared";

@Injectable({
  providedIn: "root",
})
export class GerenteService {
  private BASE_URL = env.BASE_URL + "gerente";
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<MODEL.Gerente[]> {
    return this.httpClient.get<MODEL.Gerente[]>(
      this.BASE_URL,
      this.httpOptions
    );
  }

  getById(id: string): Observable<MODEL.Gerente> {
    return this.httpClient.get<MODEL.Gerente>(
      `${this.BASE_URL}/${id}`,
      this.httpOptions
    );
  }

  create(gerente: MODEL.Gerente): Observable<MODEL.Gerente> {
    return this.httpClient.post<MODEL.Gerente>(
      this.BASE_URL,
      gerente,
      this.httpOptions
    );
  }

  update(gerente: MODEL.Gerente): Observable<MODEL.Gerente> {
    return this.httpClient.put<MODEL.Gerente>(
      `${this.BASE_URL}/${gerente.id}`,
      gerente,
      this.httpOptions
    );
  }

  delete(id: string): Observable<MODEL.Gerente> {
    return this.httpClient.delete<MODEL.Gerente>(
      `${this.BASE_URL}/${id}`,
      this.httpOptions
    );
  }
}
