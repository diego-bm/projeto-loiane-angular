import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

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

  // Com o Angular 6, a gente não precisa mais declarar nossos serviços nos 
  // providers, por conta do novo decorator "provideIn", junto do "@Injectable"
  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) {}

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
    if(cep != null && cep !== ''){
      this.cepService.consultaCEP(cep)
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
