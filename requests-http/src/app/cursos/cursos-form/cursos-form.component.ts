import { ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

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
    private location: Location
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
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

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
