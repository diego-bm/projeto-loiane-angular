import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AppModule } from '../app.module';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    AlertModule
  ],
  exports: [AlertModalComponent],
  // entryComponents: não existem mais no Angular 9+.
  // O ngx-bootstrap é tão velho, que em sua documentação, ele ainda usa
  // entryComponents. Estamos no Angular 16.
})
export class SharedModule { }
