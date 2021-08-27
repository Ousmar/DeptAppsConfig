import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IClientList } from './../models/client-name';

@Injectable({
  providedIn: 'root'
})
export class ClientNameService {
  private _clientListUrl: string = "/api/clients";
  constructor(private http: HttpClient) { }

  getClients(): Observable<IClientList[]>{
    return this.http.get<IClientList[]>(this._clientListUrl).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server ERROR");
  }
}
