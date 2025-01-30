import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent {

  formulario: FormGroup
  private formSubmitAttempt: boolean;


  constructor() {
    this.formulario = new FormGroup({},null,null);
    this.formSubmitAttempt = false;
  }

  abstract submit(): void;

  onSubmit() {
    this.formSubmitAttempt = true;

    if(this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulario invalido.')

      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  verificaValidacoesFormulario(formGroup: FormGroup | FormArray){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle: any = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();

      if(controle instanceof FormGroup || controle instanceof FormArray){
        this.verificaValidacoesFormulario(controle);
      }
    })
  }

  resetar(){
    this.formulario.reset();
    this.formSubmitAttempt = false;
  }

  verificaValidTouched(campo: string){
    return <boolean>((!this.getCampo(campo)?.valid && (this.getCampo(campo)?.touched || this.getCampo(campo)?.dirty)) ||
      ((this.getCampo(campo)?.untouched || this.getCampo(campo)?.pristine) && this.formSubmitAttempt));

    
  }

  verificaRequired(campo: string){
    return <boolean>(
      this.getCampo(campo)?.hasError('required') &&
      (this.getCampo(campo)?.touched || this.getCampo(campo)?.dirty)
    );
  }

  verificaEmailInvalido(){
    return this.verificaValidTouchedNotEmpty('email') && this.getCampo('email')?.status !== 'PENDING' && !this.verificaEmailCadastrado();
  }

  verificaEmailDiscrepante(){
    let campoEmail = this.getCampo('confirmarEmail');

    // Se o campo vier nulo, em teoria, ele nem foi renderizado ainda.
    if(campoEmail == null){
      return false;
    }

    if((campoEmail.touched || campoEmail.dirty) && !campoEmail.value){
      return true;
    }

    let emailDiscrepante: boolean = campoEmail.hasError('equalsTo');

    return emailDiscrepante;
  }

  verificaValidTouchedNotEmpty(campo: string){
    let formControl: any = this.getCampo(campo);
    if(!campo || !formControl){
      return false;
    }

    return (!formControl.valid && (formControl.touched || formControl.dirty)) && formControl.value;
  }

  // getStatusValidacaoEmail(){
  //   let statusEmail: string = <string>this.getCampo('email')?.status;

  //   return statusEmail;
  // }

  verificaEmailCadastrado(){
    let campoEmail = this.getCampo('email');

    if(!campoEmail){
      return false;
    }

    let emailCadastrado: boolean = campoEmail.hasError('emailCadastrado');

    return emailCadastrado;
  }

  aplicaCssErro(campo: string){
    return {
      'label-input-invalid': this.verificaValidTouched(campo)
    }
  }

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }

  isFieldValid(campo: string) {
    return (!this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched) ||
      (this.formulario.get(campo)?.untouched && this.formSubmitAttempt);
  }

}
