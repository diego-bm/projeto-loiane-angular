import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../models/curso.model';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  // Usar essa config deixa com que os espaços sejam preservados no template.
  // Não precisa mais usar nenhum hack pra isso.
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  modalRef: BsModalRef = new BsModalRef;

  // cursos: Curso[];

  // Anotação finlandesa (feita por um brasileiro): Adicionar '$' no final
  // do nome de uma variável feita para representar um Observable.
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private modalService: BsModalService
  ) {
    // this.cursos = [];
    this.cursos$ = EMPTY;
  }

  ngOnInit(): void {
    // this.service.list()
    //   .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return EMPTY;
        })
      );

      // Sempre que for usar o catchError do rxjs, é importante deixar ele
      // no final das operações do pipe
      this.service.list()
        .pipe(
          catchError(error => {
            console.error(error);
            this.handleError();
            return EMPTY;
          })
        )
        .subscribe(
          dados => {
            console.log(dados)
          },
          // Essa forma de lidar com o subscribe é defasada, mas não foi
          // por isso que a Loiane comentou esse trecho.

          // error => console.error(error),
          // () => console.log('Observable completo!')
        );
  }

  handleError() {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.type = 'danger';
    this.modalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
