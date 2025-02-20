import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Essa forma de fazer as rotas usando o then() é lazy loading, e virou
// padrão após o Angular 8.
const routes: Routes = [
  {
    // Durante desenvolvimento LOCAL, é legal trocar esse redirect para a
    // página que você está trabalhando.
    path: '', pathMatch: 'full', redirectTo: 'pesquisa-reativa'
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(x => x.CursosModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then(x => x.UploadFileModule)
  },
  {
    path: 'rxjs-poc',
    loadChildren: () => import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(x => x.UnsubscribeRxjsModule)
  },
  {
    path: 'pesquisa-reativa',
    loadChildren: () => import('./reactive-search/reactive-search.module').then(x => x.ReactiveSearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
