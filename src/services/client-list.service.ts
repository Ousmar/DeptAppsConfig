import { Config } from './../models/config.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IClient } from './../models/client-list';

@Injectable({
  providedIn: 'root'
})
export class ClientListService {

  private _clientUrl: string = "/api/configs";

  constructor(private http: HttpClient) { }

  getClients(): Observable<Config[]>{
    return this.http.get<Config[]>(this._clientUrl).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server ERROR");
  }

}
