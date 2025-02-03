import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../models/curso.model';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  // Usar essa config deixa com que os espaços sejam preservados no template.
  // Não precisa mais usar nenhum hack pra isso.
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];

  // Anotação finlandesa (feita por um brasileiro): Adicionar '$' no final
  // do nome de uma variável feita para representar um Observable.
  cursos$: Observable<Curso[]>;

  constructor(private service: CursosService) {
    // this.cursos = [];
    this.cursos$ = EMPTY;
  }

  ngOnInit(): void {
    // this.service.list()
    //   .subscribe(dados => this.cursos = dados);

    this.cursos$ = this.service.list();
  }
}
