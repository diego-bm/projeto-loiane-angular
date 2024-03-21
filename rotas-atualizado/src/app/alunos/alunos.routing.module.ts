import { NgModule, inject } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";
import { AlunosGuard } from "../guards/alunos.guard";
import { AlunosDeactivateGuard } from "../guards/alunos-deactivate.guard";
import { AlunoDetalheResolver } from "./guards/aluno-detalhe.resolver";

const alunosRoutes = [
    // Rotas são avaliadas na ordem em que são declaradas, ou seja,
    // a primeira que bater, vai
    {
        path: '', component: AlunosComponent, 
        canActivateChild: [() => inject(AlunosGuard).canActivateChild()],
        children: [
        // Rotas hard-coded (chumbadas) vêm antes de rotas parametrizadas.
        { path: 'novo', component: AlunoFormComponent },
        {
            path: ':id',
            component: AlunoDetalheComponent,
            resolve: { aluno : AlunoDetalheResolver }
        },
        {
            path: ':id/editar',
            component: AlunoFormComponent,
            canDeactivate: [AlunosDeactivateGuard]
        }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})
export class AlunosRoutingModule {

}