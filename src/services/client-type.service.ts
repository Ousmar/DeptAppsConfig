import { Injectable } from '@angular/core';
import { IClientType} from './../models/client-type';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientTypeService {

  private _clientTypeUrl: string = "./../assets/data/client-type.json";

  constructor(private http: HttpClient) { }

  getClients(): Observable<IClientType[]>{
    return this.http.get<IClientType[]>(this._clientTypeUrl).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server ERROR");
  }
}
