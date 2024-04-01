import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MainPageSetupRoutingModule } from './main-page-setup-routing.module';
import { MainPageSetupComponent } from './main-page-setup.component';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { AuthGuard } from '../login-module/Gaurd/auth.guard';
import { FormlyModule } from '@ngx-formly/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { UserSetupComponent } from './main-components/user-setup/user-setup/user-setup.component';
import { AllBusinessComponent } from './main-components/All-business/all-business/all-business.component';
import { DepartmentSetupComponent } from './main-components/user-setup/department-setup/department-setup.component';
import { FormsModule } from '@angular/forms';
import { UserDetailedListComponent } from './main-components/user-setup/user-detailed-list/user-detailed-list.component';
import { BusinessSetupComponent } from './main-components/business-setup/business-setup.component';
import { BusinessConfiguratorComponent } from './main-components/business-setup/business-configurator/business-configurator.component';
import { TicketConfiguratorComponent } from './main-components/business-setup/ticket-configurator/ticket-configurator.component';
import { ThirdPartyConfiguratorComponent } from './main-components/business-setup/third-party-configurator/third-party-configurator.component';
import { SellingChannelConfiguratorComponent } from './main-components/business-setup/selling-channel-configurator/selling-channel-configurator.component';
import { RepeatTypeComponent } from './main-components/business-setup/repeat.section.type';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldFile } from './main-components/business-setup/FileUpload/file-type.component';
import { FileValueAccessor } from './main-components/business-setup/FileUpload/file-value-accessor';
import { EntityConfiguratorComponent } from './main-components/business-setup/entity-configurator/entity-configurator.component';
import { ProfileConfiguratorComponent } from './main-components/business-setup/profile-configurator/profile-configurator.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@NgModule({
  declarations: [
    MainPageSetupComponent,
    UserSetupComponent,
    AllBusinessComponent,
    DepartmentSetupComponent,
    UserDetailedListComponent,
    BusinessSetupComponent,
    BusinessConfiguratorComponent,
    TicketConfiguratorComponent,
    ThirdPartyConfiguratorComponent,
    SellingChannelConfiguratorComponent,
    RepeatTypeComponent,
    FormlyFieldFile,
    FileValueAccessor,
    EntityConfiguratorComponent,
    ProfileConfiguratorComponent
  ],
  imports: [
    CommonModule,
    MainPageSetupRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyBootstrapModule,
    NgxSkeletonLoaderModule,
    FormlyModule.forRoot({
      types: [
        { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
        { name: 'repeat', component: RepeatTypeComponent }
      ],
    
      validationMessages: [{ name: 'required', message: 'This field is mandatory' }],
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
  // exports: [MainPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPageSetupModule { }
