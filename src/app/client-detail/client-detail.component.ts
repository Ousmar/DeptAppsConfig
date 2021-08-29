import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  updateForm!: FormGroup;
  public clients: any = [];
  public configs: any = [];
  public parameters: any = [];
  configId: number = 0;



  public clientData: any = [];
  public errorMsg: any;
  public errorMsg2: any;
  public clientId: number = 0;
  submitted = false;



  /* get parametersForm() {
    return this.updateForm.get('parameters') as FormArray;
  } */

  /* AddparametersForm(){
    return this.parametersForm.push(this.formBuilder.control(''));
  } */



  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
    private service: AppService, private _clientService: ClientListService, private _clientTypeService: ClientTypeService, private _clientAppService: AppService) { }
    

  ngOnInit(): void {

    //récupere l'id de la config cliquée!
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id: string = params.get('id')!;
      this.configId = +id;
      console.log(this.configId);
    }
    );


    //recuperation de l'ensemble des donnees

    this.service.getClients().subscribe(data => { this.clients = data });
    


    this.service.getConfigs2().subscribe((data: any) => {
      this.configs = data;
      //console.log(this.configs)
    });


    this.service.getParameters().subscribe((data:any) => {
      for(let par of data){
        if(par.id_config==this.configId){
          this.parameters.push(par);
        }
      }
    });
    

  }

  



  getParameters() {
    return this.parameters;
  }




  onSubmit(form: NgForm) {
    for(let par of this.parameters){
      par.value=form.value[par.col_name];
      console.log(par.value);
      this.service.updateParameter(par).subscribe(newData=>console.log(newData));
    }
}

}
