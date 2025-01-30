import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent {

  formulario: FormGroup

  constructor() {
    this.formulario = new FormGroup({},null,null);
  }

  abstract submit(): void;

  onSubmit() {
    if(this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulario invalido.')

      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  // TODO: Implementar a forma diferente de validar campos feita pela Loiane.
  // Disponível em: loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit
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
  }

  // TODO: Remover isso daqui para apenas utilizar o do input-field
  verificaValidTouched(campo: string){
    let formControl: any = this.getCampo(campo);
    if(!campo || !formControl){
      return false;
    }

    return !formControl.valid && (formControl.touched || formControl.dirty);
  }

  verificaRequired(campo: string){
    return <boolean>(
      this.getCampo(campo)?.hasError('required') &&
      (this.getCampo(campo)?.touched || this.getCampo(campo)?.dirty)
    );
  }

  verificaEmailInvalido(){
    return this.verificaValidTouchedNotEmpty('email') && this.getStatusValidacaoEmail() !== 'PENDING' && !this.verificaEmailCadastrado();
  }

  verificaValidTouchedNotEmpty(campo: string){
    let formControl: any = this.getCampo(campo);
    if(!campo || !formControl){
      return false;
    }

    return (!formControl.valid && (formControl.touched || formControl.dirty)) && formControl.value;
  }

  getStatusValidacaoEmail(){
    let statusEmail: string = <string>this.getCampo('email')?.status;

    return statusEmail;
  }

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

}
