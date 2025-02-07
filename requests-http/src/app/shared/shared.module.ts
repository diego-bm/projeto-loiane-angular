import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [AlertModalComponent],
  imports: [
    CommonModule,
    AlertModule
  ],
  exports: [AlertModalComponent]
})
export class SharedModule { }
