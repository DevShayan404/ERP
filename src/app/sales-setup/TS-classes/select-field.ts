import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-custom-select',
  template: `
  <!-- [class]="field?.templateOptions?.class" -->
    <!-- <select class="form-control" >
      <option *ngFor="let option of fields.options" [value]="option.value">{{ option.label }}</option>
    </select> -->
  `,
})
export class CustomSelectComponent extends FieldType {}