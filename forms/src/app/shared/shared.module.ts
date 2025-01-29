import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-controls/campo-control-erro/campo-control-erro.component';
import { DropdownService } from './services/dropdown.service';
import { CampoControlInfoComponent } from './campo-controls/campo-control-info/campo-control-info.component';
import { CampoControlSuccessComponent } from './campo-controls/campo-control-success/campo-control-success.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    CampoControlInfoComponent,
    CampoControlSuccessComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    CampoControlInfoComponent,
    CampoControlSuccessComponent
  ],
  providers: [ DropdownService ]
})
export class SharedModule { }
