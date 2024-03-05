import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";

const alunosRoutes = [
    // Rotas são avaliadas na ordem em que são declaradas, ou seja,
    // a primeira que bater, vai
    { path: 'alunos', component: AlunosComponent, children: [
        // Rotas hard-coded (chumbadas) vêm antes de rotas parametrizadas.
        { path: 'novo', component: AlunoFormComponent },
        { path: ':id', component: AlunoDetalheComponent },
        { path: ':id/editar', component: AlunoFormComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})
export class AlunosRoutingModule {

}