/*
********************************************************************
* A Loiane reconstruiu o arquivo de rotas dela para ser um módulo. *
* Entretanto, como ela usa uma versão antiga do Angular, é         *
* possível que na época isso ainda não fosse a prática mais comum  *
* (o Angular CLI nem te dava a opção de rotas naquela época), por  *
* isso que não tive que criar nenhum arquivo novo e por isso que a *
* parte comentada é praticamente idêntica ao que ela mandou fazer  *
* nesse arquivo, eu já havia adaptado a minha aplicação para os    *
* padrões atuais, que parecem ser os mesmos que ela está           *
* implementando.                                                   *
********************************************************************
*/

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { CursosComponent } from './cursos/cursos.component';
// import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
// import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

// const routes: Routes = [
//   { path: 'cursos', component: CursosComponent },
//   { path: 'curso/:id', component: CursoDetalheComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'naoEncontrado', component: CursoNaoEncontradoComponent },
//   { path: '', component: HomeComponent }
// ];

// // Isso é do curso, não funcionou
// // export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

// A nomenclatura de constantes no JS (no qual o Typescript parece seguir)
// deixa constantes em camelcase.
const appRoutes: Routes = [
  // A forma de se declarar rotas filhas para lazy-loading no Angular
  // mudou e já não é da forma que a Loiane apresentou.
  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(x => x.AlunosModule),
    canActivate: [AuthGuard],
    //canActivateChild: [AlunosGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(x => x.CursosModule),
    canActivate: [AuthGuard],
    canActivateChild: [CursosGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // Sempre deixar esse caminho por último, pois na hora de selecionar
  // que rota levar o usuário, o Angular itera cada um dos itens desse
  // array de rotas do módulo de roteamento, sequencialmente. O
  // primeiro que encaixar, ele vai mandar.
  {
    path: '**',
    component: PaginaNaoEncontradaComponent //Também podemos redirecionar para a página de login se o usuário não estiver logado.
  }
];

@NgModule({
  // Em vez de colocar a constante aqui, eu também posso colocar todas
  // as rotas que serão declaradas, vai de gosto.
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }