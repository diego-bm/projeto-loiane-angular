import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertModule } from 'ngx-bootstrap/alert';



@NgModule({
  declarations: [AlertModalComponent],
  imports: [
    CommonModule,
    AlertModule
  ],
  exports: [AlertModalComponent]
})
export class SharedModule { }
