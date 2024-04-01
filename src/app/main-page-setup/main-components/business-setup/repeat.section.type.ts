import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div class="mb-3 container" >
      <!-- <legend *ngIf="props.label">{{ props.label }}</legend>
      <p *ngIf="props.description">{{ props.description }}</p> -->

      <div style="margin-top:5px;padding:5px" *ngFor="let field of field.fieldGroup; let i = index" class="row align-items-baseline">
        <formly-field class="col" [field]="field"></formly-field>
        <div class="col-1 d-flex align-items-center">
        <!-- <div style="background-color: purple;color:white;padding:10px;border-radius:10%">{{i+1}}</div> -->
          <button class="btn btn-danger" type="button" (click)="remove(i)"><i class="bi bi-trash3"></i></button>
        </div>
        <!-- <hr> -->
      </div>
 
      <div style="display:flex; justify-content:flex-end;margin-right:50px">
        <button [disabled]="!form.valid" class="btn btn-primary" type="button" (click)="add()"><i class="bi bi-plus-circle"></i></button>
      </div>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}
