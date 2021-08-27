import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AddConfigComponent } from './add-config/add-config.component';
import { AppService } from 'src/services/app.service';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AddClientComponent } from './add-client/add-client.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListService } from 'src/services/client-list.service';
import { ClientNameService } from 'src/services/client-name.service';
import { ClientTypeService } from 'src/services/client-type.service';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes:Routes=[
  {path:'dashbord', component: DashbordComponent},
  {path:'profile', component: ProfileComponent},
  {path:'addConfig', component:AddConfigComponent},
  {path:'addClient', component: AddClientComponent},
  {path: 'clients/:id', component: ClientDetailComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    AddConfigComponent,
    AddClientComponent,
    ClientDetailComponent,
    DashbordComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule
    
  ],
  providers: [
    AppService,
    ClientListService,
    ClientNameService,
    ClientTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
