import { Component } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {
  usuario: any = {
    nome: '',
    email: '',
    endereco: {
      cep: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  }

  onSubmit(form: any){
    console.log(form);
  }

  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any){
    return {
      'label-input-invalid': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep: any){
    console.log(cep);
  }
}
