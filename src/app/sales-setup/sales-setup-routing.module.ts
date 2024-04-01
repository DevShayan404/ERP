import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesSetupComponent } from './sales-setup.component';
import { DashboardComponent } from './Sales-Components/dashboard/dashboard/dashboard.component';
import { SaleLeadsComponent } from './Sales-Components/sale-leads/sale-leads.component';
import { NavbarComponent } from './Sales-Dashboard/navbar/navbar.component';
import { CallingDataComponent } from './Sales-Components/calling-data/calling-data.component';
import { LeadInfoComponent } from './Sales-Components/lead-info/lead-info.component';
import { LeadRequestDailogComponent } from './Sales-Components/lead-info/lead-request-dailog/lead-request-dailog.component';
// const routes: Routes = [{ path: '', component: SalesSetupComponent }];


const routes: Routes = [
  
  {
    path: '',
    title: 'Lead setup',
    component:NavbarComponent,
    //  canActivate:[AuthGuard],
    //  data: {roles:["Admin","Agent"]}, 
    children: [
      {
        path: '',
        title: 'Dashboard',
        component:DashboardComponent,  // another child route component that the router renders
      },
      {
        path: 'Dashboard',
        title: 'Dashboard',
        component:DashboardComponent,  // another child route component that the router renders
      },
      {
        path: 'leads',  // child route path
        title: 'leads',
        component:SaleLeadsComponent,  // child route component that the router renders
      },
      {
        path: 'callingdata',  // child route path
        title: 'callingdata',
        component:CallingDataComponent,  // child route component that the router renders
      },
      {
        path: 'leadInfo', 
        title: 'Lead info',
        component:LeadInfoComponent,  
      },
      {
        path: 'leadRequest', 
        title: 'lead request',
        component:LeadRequestDailogComponent,  
      }
    ],
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesSetupRoutingModule { }
