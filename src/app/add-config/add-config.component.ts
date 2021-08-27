import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/models/client.model';
import { Config } from 'src/models/config.model';
import { Parameter } from 'src/models/parameter.model';
import { AppService } from 'src/services/app.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-config',
  templateUrl: './add-config.component.html',
  styleUrls: ['./add-config.component.css']
})
export class AddConfigComponent implements OnInit {

  configForm!: FormGroup;
  clients!: any[];
  
  

  constructor(private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private http:HttpClient) { }

  ngOnInit() {
    this.initForm();
    this.appService.getClients().subscribe(data => {
      this.clients=data;
    });
  }
  

  initForm() {
    this.configForm = this.formBuilder.group({
      configName: ['', Validators.required],
      clientName: ['', Validators.required],
      parametersNames: this.formBuilder.array([]),
      parametersTypes: this.formBuilder.array([])
    });
    this.onAddParameter();
  }

  onSubmit() {
    const formValue = this.configForm.value;

    var parameters = [];

    for (var index in formValue['parametersNames']) {
      var par = new Parameter(formValue['parametersNames'][index], formValue['parametersTypes'][index],'');
      parameters.push(par);
    };

    if(parameters.length==0){
      var p=document.createElement('p');
      p.textContent="'A configuration has at least one parameter!'";
      p.style.color="red";
      p.style.fontSize="10px";
      var span=document.getElementById('error message1');
      span?.appendChild(p);

    }
    else{
      const newConfig = new Config(
        formValue['configName'],
        formValue['clientName'],
        parameters
      );
  
      this.appService.addConfig(newConfig).subscribe(
        newData => {
          this.appService.getConfigs().subscribe(
            list => list.push(newData)
          );
        }
      );

      this.Confirmed();
      this.router.navigate(['']);

    }
  }

  getParametersNames(): FormArray {
    return this.configForm.get('parametersNames') as FormArray;
  }
  getParametersTypes(): FormArray {
    return this.configForm.get('parametersTypes') as FormArray;
  }

  onAddParameter() {
    const newParameterName = this.formBuilder.control(null, Validators.required);
    this.getParametersNames().push(newParameterName);
    const newParameterType = this.formBuilder.control(null, Validators.required);
    this.getParametersTypes().push(newParameterType);

  }

  onDeleteParameter(i:number){
    this.getParametersNames().removeAt(i);
    this.getParametersTypes().removeAt(i);
    var htmlElements=document.getElementById(i.toString());
    htmlElements?.remove();
    
    
  }

  onCancel() {
    this.initForm();
  }

  Confirmed() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Configuration saved!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  /* Warning() {
    Swal.fire(
      "a configuration has at least onr parameter!",
      "",
      "warning"
    )} */
  
}
