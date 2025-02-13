import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { resolve } from '../guards/cursos.guard';

const routes: Routes = [
  { path: '', component: CursosListaComponent },
  {
    path: 'novo', component: CursosFormComponent,
  },
  {
    path: 'editar/:id', component: CursosFormComponent,
    resolve: {
      curso: resolve
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
