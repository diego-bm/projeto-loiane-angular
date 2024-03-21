import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.scss']
})
export class CursoDetalheComponent {
  id: number = 0;
  inscricao: Subscription = new Subscription;
  curso: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {
    // this.id = this.route.snapshot.params['id'];
    // console.log(this.route);
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.curso = this.cursosService.getCurso(this.id);

        if (this.curso == null) {
          // Podemos, ainda, passar o id como parâmetro junto do caminho
          // da rota alí dentro do navigate, que pode ser útil dependendo
          // da aplicação.
          this.router.navigate(['/cursos/naoEncontrado'])
        }
      }
    )
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
