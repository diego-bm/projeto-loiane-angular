import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../models/curso.model';
import { catchError, EMPTY, Observable, Subject, switchMap, take } from 'rxjs';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  // Usar essa config deixa com que os espaços sejam preservados no template.
  // Não precisa mais usar nenhum hack pra isso.
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  cursoSelecionado!: Curso;
  // deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal')
  deleteModal!: TemplateRef<any>;

  // cursos: Curso[];

  // Anotação finlandesa (feita por um brasileiro): Adicionar '$' no final
  // do nome de uma variável feita para representar um Observable.
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
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

      // A Loiane mandou comentar isso aqui por que não será necessário, mas
      // o model de erro quebra se faz isso????
      // // Sempre que for usar o catchError do rxjs, é importante deixar ele
      // // no final das operações do pipe
      // this.service.list()
      //   .pipe(
      //     catchError(error => {
      //       console.error(error);
      //       this.handleError();
      //       return EMPTY;
      //     })
      //   )
      //   .subscribe(
      //     dados => {
      //       console.log(dados)
      //     },
      //     // Essa forma de lidar com o subscribe é defasada, mas não foi
      //     // por isso que a Loiane comentou esse trecho.

      //     // error => console.error(error),
      //     // () => console.log('Observable completo!')
      //   );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');

    // this.modalRef = this.modalService.show(AlertModalComponent);
    // this.modalRef.content.type = 'danger';
    // this.modalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });

  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })

    const result$: Subject<boolean> = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?', 'Sim', 'Cancelar');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(this.cursoSelecionado.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
      }
    );
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
      }
    );
  }

  // onDeclineDelete() {
  //   this.deleteModalRef?.hide();
  // }
}
