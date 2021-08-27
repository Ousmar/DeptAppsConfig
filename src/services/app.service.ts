import { Config } from "src/models/config.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Client } from "src/models/client.model";

@Injectable()
export class AppService{
    
    constructor(private httpClient:HttpClient){}

    getConfigs():Observable<Config[]>{
        return this.httpClient.get<Config[]>('/api/configs');
    }

    addConfig(newConfig:any):Observable<Config>{
        return this.httpClient.post<any>('/api/configs',newConfig);
    } 

    getClients():Observable<Client[]>{
        return this.httpClient.get<Client[]>('/api/clients');
        
    }

    addClient(newClient:any):Observable<any>{
       return this.httpClient.post<any>('/api/clients',newClient);
    }

    updateClientData(id: any, data: any){
        return this.httpClient.put<any>('/api/clients',data);
      }


}