import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientListService } from 'src/services/client-list.service';
import { ClientNameService } from 'src/services/client-name.service';
import Swal from 'sweetalert2';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  public clients: any = [];
  public configs: any = [];
  public clientsName: any = [];
  public errorMsg: any;
  public errorMsgCN: any;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private observer: BreakpointObserver, private router: Router,
    private service: AppService, private _clientService: ClientListService, private _clientNameService: ClientNameService) { }



  tinyAlert() {
    Swal.fire('Hey there!');
  }

  successNotification() {
    Swal.fire('Hi', 'We have been informed!', 'success')
  }

  onSelect(config: any) {
    this.router.navigate(['/clients', config.id]);
  }

  ngOnInit() {
    this.service.getClients().subscribe(data => this.clients = data,
      error => this.errorMsg = error);

    this.service.getConfigs2().subscribe((data: any) => this.configs = data,
      (error: any) => this.errorMsgCN = error);
  }


}
