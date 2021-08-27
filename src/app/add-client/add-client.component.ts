import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/models/client.model';
import { AppService } from 'src/services/app.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;




  constructor(private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    const CName = this.clientForm.value['name'];
    var condition:boolean=false;
    this.appService.getClients().subscribe(listClients => {
      for (let element of listClients) {
        if (element.name == CName) {
          condition=true;
          break;
        }
      };
      if(condition==true){this.generateError();}
      else{this.addClient(CName);}

    });

  }

  addClient(CName:string) {
    var newClient: Client;
          newClient = new Client(0, CName);

          this.appService.addClient(newClient).subscribe(data => {
            this.appService.getClients().subscribe(list=>list.push(data));
          });
          var closeButton = document.getElementById("modalClose");
          closeButton?.click();
          this.Confirmed();

  }

  generateError() {
    var p = document.createElement('p');
    p.textContent = "'Client existed!'";
    p.style.color = "red";
    p.style.fontSize = "10px";
    var span = document.getElementById('error message2');
    span?.appendChild(p);
  }



  Confirmed() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Client saved!',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
