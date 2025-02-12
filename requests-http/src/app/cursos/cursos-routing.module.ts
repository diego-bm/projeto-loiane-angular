import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { cursoResolver } from '../resolvers/curso-resolver.resolver';

const routes: Routes = [
  { path: '', component: CursosListaComponent },
  {
    path: 'novo', component: CursosFormComponent,
    // ISSO TUDO QUEBROU O FORMULÁRIO, UGH!
    // Isso quebra o botão, Loiane...
    // TODO?: Dar um jeito de não quebrar o botão ao usar esse resolve
    // TODO: corrigir erros no console ao acessar essa rota
    // (Esse módulo do curso tá criando MUITO código quebrado e
    // descontinuado)
    // resolve: {
    //   curso: cursoResolver
    // }
  },
  {
    path: 'editar/:id', component: CursosFormComponent,
    resolve: {
      curso: cursoResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
