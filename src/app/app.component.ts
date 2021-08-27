import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientListService } from 'src/services/client-list.service';
import { ClientNameService } from 'src/services/client-name.service';
import Swal from 'sweetalert2';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  public clients: any = [];
  public clientsName: any = [];
  public errorMsg: any;
  public errorMsgCN: any;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private observer: BreakpointObserver, private router: Router, private _clientService : ClientListService, private _clientNameService : ClientNameService ) { }



  tinyAlert(){
    Swal.fire('Hey there!');
  }
  
  successNotification(){
    Swal.fire('Hi', 'We have been informed!', 'success')
  }

  onSelect(client: any){
    this.router.navigate(['/clients',client.id]);
  }

  ngOnInit() {
    this._clientService.getClients().subscribe(data => this.clients = data,
                                                error => this.errorMsg = error);

    this._clientNameService.getClients().subscribe(data => this.clientsName = data,
                                              error => this.errorMsgCN = error);
  }

  
}
