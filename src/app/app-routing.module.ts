import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './sales-setup/Sales-Dashboard/navbar/navbar.component';
import { LoginPageComponent } from './login-module/login-page/login-page.component';
import { LogoutGuard } from './login-module/Gaurd/logout.guard';
import { ClientProposalPreviewComponent } from './client-site/client-proposal-preview/client-proposal-preview.component';
const routes: Routes = [
  {
    path: "", redirectTo:"login", pathMatch:'full'
  },
  {
    path: 'login',
    component:LoginPageComponent,
    canActivate:[LogoutGuard],
  },
  { path: 'main-page-setup', loadChildren: () => import('./main-page-setup/main-page-setup.module').then(m => m.MainPageSetupModule) },
  { path: 'navbar', loadChildren: () => import('./sales-setup/sales-setup.module').then(m => m.SalesSetupModule) },
  {
    path: "clientproposal",
    component:ClientProposalPreviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
