import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Config } from 'src/models/config.model';
import { AppService } from 'src/services/app.service';
import { ClientListService } from 'src/services/client-list.service';
import { ClientTypeService } from 'src/services/client-type.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  public clients: any = [];
  public clientData: any = [];
  public errorMsg: any;
  public errorMsg2: any;
  public clientId: number = 0;
  submitted= false;
  
  get parametersForm(){
    return this.updateForm.get('parametersForm') as FormArray;
  }

  AddparametersForm(){
    return this.parametersForm.push(this.formBuilder.control(''));
  }

updateForm = this.formBuilder.group({
  idConfig: [''],
  nameConfig: [''],
  nameClient: [''],
  parametersForm: this.formBuilder.array([])
});

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private _clientService : ClientListService, private _clientTypeService: ClientTypeService, private _clientAppService: AppService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id: string = params.get('id')!;
      this.clientId = +id;
    }
    );

    this._clientService.getClients().subscribe(data => this.clients = data,
      error => this.errorMsg = error);

    this._clientTypeService.getClients().subscribe(data => this.clientData = data,
                                                error => this.errorMsg2 = error);
      
  }




  onSubmit(){
    this.submitted = true;
    //console.log(this.configForm);
  }

}
