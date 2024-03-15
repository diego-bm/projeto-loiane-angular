import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlunosService } from '../alunos.service';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements IFormCanDeactivate {
  aluno: any = {};
  inscricao: Subscription = new Subscription;
  private _formMudou: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService
  ) {}

  podeDesativar() {
    return this.podeMudarRota();
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this.alunosService.getAluno(id);

        if(this.aluno === null) {
          this.aluno = {};
        }
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onInput() {
    this._formMudou = true;
    console.log('mudou');
    
  }

  podeMudarRota() {
    if(this._formMudou) {
      confirm('Tem certeza que deseja sair dessa página?');
    }

    return true;
  }
}
