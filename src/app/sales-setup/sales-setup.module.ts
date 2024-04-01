import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SalesSetupRoutingModule } from './sales-setup-routing.module';
import { SalesSetupComponent } from './sales-setup.component';
import { DashboardComponent } from './Sales-Components/dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './Sales-Dashboard/components/header/header.component';
import { LeftMenuComponent } from './Sales-Dashboard/components/left-menu/left-menu.component';
import { NavbarComponent } from './Sales-Dashboard/navbar/navbar.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { MaterialModule } from '../material/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SaleLeadsComponent } from './Sales-Components/sale-leads/sale-leads.component';
import { CallingDataComponent } from './Sales-Components/calling-data/calling-data.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LeadInfoComponent } from './Sales-Components/lead-info/lead-info.component';
import { InputFieldType } from './TS-classes/formly-field-input';
import { CustomSelectComponent } from './TS-classes/select-field';
import { LeadInfoRemrksComponent } from './Sales-Components/lead-info/lead-info-remrks/lead-info-remrks.component';
import { QuillModule } from 'ngx-quill';
import { LeadInfoAttachmentsComponent } from './Sales-Components/lead-info/lead-info-attachments/lead-info-attachments.component';
import { BusinessDialogueComponent } from './Sales-Components/BusinessForm-dialogue/business-dialogue/business-dialogue.component';
@NgModule({
  declarations: [
    SalesSetupComponent,
    DashboardComponent,
    HeaderComponent,
    LeftMenuComponent,
    NavbarComponent,
    SaleLeadsComponent,
    CallingDataComponent,
    LeadInfoComponent,
    InputFieldType,
    CustomSelectComponent,
    LeadInfoRemrksComponent,
    LeadInfoAttachmentsComponent,
    BusinessDialogueComponent,
  ],
  imports: [
    CommonModule,
    SalesSetupRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot(),
    FormlyModule.forRoot({
      types: [
        { name: 'CustomInput', component: InputFieldType },
        { name: 'custom-select', component: CustomSelectComponent },]
      }),
    FormlyBootstrapModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SalesSetupModule { }
