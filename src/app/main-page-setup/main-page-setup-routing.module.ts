import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageSetupComponent } from './main-page-setup.component';
import { AuthGuard } from '../login-module/Gaurd/auth.guard';
import { AllBusinessComponent } from './main-components/All-business/all-business/all-business.component';
import { UserSetupComponent } from './main-components/user-setup/user-setup/user-setup.component';
import { BusinessSetupComponent } from './main-components/business-setup/business-setup.component';
import { AllTicketsComponent } from './main-components/All-business/all-tickets/all-tickets.component';
// const routes: Routes = [{ path: '', component: MainPageSetupComponent }];

const routes: Routes = [
  
  {
    path: '',
    title: 'Main Page',
    component:MainPageSetupComponent,
     canActivate:[AuthGuard],
     data: {roles:["Admin","Agent","Manager","Team Lead"]}, 
    children: [
      {
        path: '',
        title: 'All Buisness',
        component:AllBusinessComponent, 
      },
      {
        path: 'UserSetup',
        title: 'User Setup',
        canActivate:[AuthGuard],
        data: {roles:["Admin","Manager"]},
        component:UserSetupComponent, 
      },
      {
        path: 'BusienssSetup',
        title: 'Business Setup',
        canActivate:[AuthGuard],
        data: {roles:["Admin","Manager"]},
        component:BusinessSetupComponent, 
      },
      
      {
        path: 'alltickets',
        title: 'All Ticket',
        canActivate:[AuthGuard],
        data: {roles:["Admin","Manager"]},
        component:AllTicketsComponent, 
      },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageSetupRoutingModule { }
