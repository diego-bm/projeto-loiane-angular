import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidations } from '../services/form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent {
  @Input() label: string;

  @Input() control: AbstractControl | null;

  constructor() {
    this.label = "";

    this.control = new FormControl();
  }

  ngOnInit() {
    
  }

  get errorMessage() {
    let control: FormControl;

    if(this.control){
      control = <FormControl>this.control;

      for(const propertyName in control.errors){
        if(control.errors.hasOwnProperty(propertyName) && control.touched){
          return FormValidations.getErrorMessage(this.label, propertyName, control.errors[propertyName])
        }
      }
    }

    return null;
  }
}
