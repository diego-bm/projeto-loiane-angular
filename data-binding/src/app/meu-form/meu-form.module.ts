import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeuFormComponent } from './meu-form.component';



@NgModule({
  declarations: [
    MeuFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MeuFormComponent
  ]
})
export class MeuFormModule { }
