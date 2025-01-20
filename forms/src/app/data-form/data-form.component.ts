// Na aula, a Loiane apenas importa o Http no módulo e ele funciona. Aqui,
// eu fui forçado a manter o import no componente. Manterei assim.
// Provavelmente é uma mudança nos Angulars mais recentes.
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    // });

    // Essa forma também é verbosa, mas possui uma sintaxe mais simples.
    // Por baixo dos panos, esse código faz a mesma coisa do bloco comentado
    // acima.
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null]
    })
  }

  ngOnInit(){
    
  }

  onSubmit(){
    console.log(this.formulario.value);

    // Usar o "error" ali depois do subscribe parece estar descontinuado.
    // Pelo que eu entendi, devemos tratar esse erro no próprio corpo do
    // subscribe, tratando a resposta que obtivermos.
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .subscribe(dados => {
      console.log(dados);
      // reseta o form;
      this.resetar();
    },
  (error: any) => alert('erro'));
  }

  resetar(){
    this.formulario.reset();
  }

}
