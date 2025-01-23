// Na aula, a Loiane apenas importa o Http no módulo e ele funciona. Aqui,
// eu fui forçado a manter o import no componente. Manterei assim.
// Provavelmente é uma mudança nos Angulars mais recentes.
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    // Passando o conteúdo abaixo para o construtor para corrigir o erro da 
    // aula 89 - 90

    // Forma verbosa de se criar os campos do formulário
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),

    //   endereco: new FormGroup({
    //     cep: new FormControl(null)
    //   })
    // });

    // Essa forma também é verbosa, mas possui uma sintaxe mais simples.
    // Por baixo dos panos, esse código faz a mesma coisa do bloco comentado
    // acima.
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    })

    // Exemplos de Validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
  }

  ngOnInit(){
    
  }

  onSubmit(){
    if(this.formulario.valid){
      // Usar o "error" ali depois do subscribe parece estar descontinuado.
      // Pelo que eu entendi, devemos tratar esse erro no próprio corpo do
      // subscribe, tratando a resposta que obtivermos.
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(dados => {
        console.log(dados);
        // reseta o form;
        this.resetar();
      },
      (error: any) => alert('erro')
      );
    } else {
      console.log('formulario invalido.')

      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  verificaValidacoesFormulario(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();

      if(controle instanceof FormGroup){
        this.verificaValidacoesFormulario(controle);
      }
    })
  }

  resetar(){
    this.formulario.reset();
  }

  // verificaEmailInvalido(){
  //   let formControl: any = this.formulario.get('email');
  //   if(!formControl && formControl.touched){
  //     return false;
  //   }

  //   if(formControl.errors){
  //     if(formControl.errors['email'] && formControl.touched){
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  aplicaCssErro(campo: string){
    return {
      'label-input-invalid': this.verificaValidTouched(campo)
    }
  }

  verificaValidTouched(campo: string){
    let formControl: any = this.formulario.get(campo);
    if(!campo || !formControl){
      return false;
    }

    return !formControl.valid && (formControl.touched || formControl.dirty);
  }

  consultaCEP(){
    let cep = this.formulario.get('endereco.cep')?.value;

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
              this.populaDadosEndereco(dados);
            }
          });
      } else {
        alert('CEP inválido.');
      }
    }
  }

  populaDadosEndereco(dados: any){
    this.formulario.get('endereco.complemento')?.setValue(dados.complemento)
    this.formulario.get('endereco.rua')?.setValue(dados.logradouro)
    this.formulario.get('endereco.bairro')?.setValue(dados.bairro)
    this.formulario.get('endereco.cidade')?.setValue(dados.localidade)
    this.formulario.get('endereco.estado')?.setValue(dados.estado)
  }

}
