import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFormComponent } from './data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
// Na aula, a Loiane apenas importa o Http no módulo e ele funciona. Aqui,
// eu fui forçado a manter o import no componente. Ainda colocarei o import
// no módulo.
// Provavelmente é uma mudança nos Angulars mais recentes.
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DataFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
})
export class DataFormModule { }
