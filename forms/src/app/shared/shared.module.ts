import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-controls/campo-control-erro/campo-control-erro.component';
import { DropdownService } from './services/dropdown.service';
import { CampoControlInfoComponent } from './campo-controls/campo-control-info/campo-control-info.component';
import { CampoControlSuccessComponent } from './campo-controls/campo-control-success/campo-control-success.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    CampoControlInfoComponent,
    CampoControlSuccessComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    CampoControlInfoComponent,
    CampoControlSuccessComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  providers: [ DropdownService ]
})
export class SharedModule { }
