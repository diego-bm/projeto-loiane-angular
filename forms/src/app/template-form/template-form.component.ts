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

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .subscribe(dados => {
      console.log(dados);
      // form reset
      form.form.reset();
    });
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

  consultaCEP(cep: string, form: any){
    cep = cep.replace(/\D/g, '');

    if (cep != '') {
      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)){
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .subscribe((dados: any) => {
            if(dados.erro == 'true'){
              alert('O CEP inserido é inválido ou não foi encontrado.')
              return;
            } else {
              this.usuario.endereco.complemento = dados.complemento;
              this.usuario.endereco.rua = dados.logradouro;
              this.usuario.endereco.bairro = dados.bairro;
              this.usuario.endereco.cidade = dados.localidade;
              this.usuario.endereco.estado = dados.estado;
            }
          });
      } else {
        alert('CEP inválido.');
      }
    }
  }

  // Achei esse método da Loiane ultrapassado
  //
  // populaDadosForm(dados: any, form: any) {
  //   form.setValue({
  //     nome: '',
  //     email: '',
  //     endereco: {
  //       cep: '',
  //       numero: '',
  //       complemento: '',
  //       rua: dados.logradouro,
  //       bairro: '',
  //       cidade: '',
  //       estado: ''
  //     }
  //   })
  // }
}
