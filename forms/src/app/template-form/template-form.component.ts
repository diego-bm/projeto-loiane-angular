import { HttpClient } from '@angular/common/http';
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
      rua: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  }

  constructor(private http: HttpClient) {}

  onSubmit(form: any){
    console.log(form);
  }

  verificaValidTouched(campo: any){
    if(!campo){
      return false;
    }
    
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any){
    return {
      'label-input-invalid': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep: any){
    cep = cep.replace(/\D/g, '');

    if (cep != '') {
      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .subscribe(dados => console.log(dados));
      }
    }
  }
}
