import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent {
  // Isso aqui não deve estar certo
  aluno!: Aluno;
  inscricao: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService
  ) {}

  ngOnInit() {
    /*
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this.alunosService.getAluno(id);
      }
    );
    */

    this.inscricao = this.route.data.subscribe(
      (info) => {
        console.log(info);
        // Não consigo acessar o atributo "aluno" da mesma forma que
        // a Loiane faz, provavelmente por conta de mudanças no
        // TypeScript desde então.
        this.aluno = info['aluno'];
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar'])
  }
}
