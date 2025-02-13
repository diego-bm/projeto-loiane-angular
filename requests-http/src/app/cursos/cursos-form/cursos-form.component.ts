import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { Curso } from '../models/curso.model';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  showSuccessModal: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({});
  }

  // O componente estava sendo destruído antes de mostrar o modal de sucesso
  ngOnDestroy(): void {
    if(this.showSuccessModal) {
      this.showSuccessModal = false;
      this.modal.showAlertSuccess('Curso criado com sucesso!');
    }
  }

  ngOnInit(): void {
    // let registro = null;

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);

    //     const curso$: Observable<Curso> = this.service.loadByID(id);

    //     if(id) {
    //       curso$.subscribe(curso => {
    //         registro = curso;
    //         this.updateForm(curso)
    //       });
    //     }
    //   }
    // )

    // console.log(registro);

    // // Aqui não precisa desinscrever por que o Angular automaticamente se
    // // desinscreve de Observables que são destruídos, QUANDO É UM
    // // ACTIVATEDROUTE
    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.service.loadByID(id))
    //   // switchMap(curso => obterAulas(curso.id)
    // )
    // .subscribe((curso: Curso) => this.updateForm(curso));

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem da requisição não importa
    // exhaustMap -> casos de login

    let curso = this.route.snapshot.data['curso'];

    // let curso = this.route.data.subscribe((resolvedData) => {
    //   return resolvedData['curso'];
    // })

    console.log('curso: ', curso);

    if(curso) {
      if(curso.id) {
        this.form = this.fb.group({
          id: [curso.id],
          nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
        });
      } else {
        this.form = this.fb.group({
          id: [null],
          nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
        });
      }
    } else {
      this.form = this.fb.group({
        id: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
      });
    }
  }

  // updateForm(curso: Curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field: string): boolean {
    let errors = this.form.get(field)?.errors;

    if(errors) {
      return true;
    } else {
      return false;
    }
  }

  getError(field: string) {
    return this.form.get(field)?.errors ?? {};
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if(this.form.valid) {
      console.log('submit');
      // De acordo com o seguinte issue: https://github.com/typicode/json-server/issues/1477
      // o json-server gera ids como string mesmo, é parte da V1 dele.
      // (vai entender por que)
      this.service.create(this.form.value).subscribe(
        success => {
          this.showSuccessModal = true;
          this.location.back();
        },
        error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
        () => console.log('request completo')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }
}
