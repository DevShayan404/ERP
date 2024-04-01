import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
    
  <div  class="form">
  <input [style.border]="showError ? '1px solid red' : '1px solid rgb(204, 204, 204)'"
  [formlyAttributes]="field"
  [formControl]="formControl"
    [type]="props.type"
    class="form__input"
  />
  
  <!-- style="font-size: 15px" -->
  <label [style.color]="showError ? ' red' : ''"  class="form__label" 
    >{{ props.label }}</label
  >
  <!-- <div class="formly-error">
    <formly-validation-message
      *ngIf="showError"
      [field]="field"
    ></formly-validation-message>
  </div> -->
  
  </div>


   
  `,
})
export class InputFieldType extends FieldType<FieldTypeConfig> { }

// <input class="inputStyle" type="input" [formControl]="formControl" [formlyAttributes]="field">


// <div class="col col-12"><div><label style="margin-bottom:0;">{{ props.label }} </label></div><div><input class="form-control" type="input" [formControl]="formControl"[formlyAttributes]="field"> </div></div>