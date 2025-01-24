// Na aula, a Loiane apenas importa o Http no módulo e ele funciona. Aqui,
// eu fui forçado a manter o import no componente. Manterei assim.
// Provavelmente é uma mudança nos Angulars mais recentes.
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {

  formulario: FormGroup;
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ) {
    // Inicializando formGroup vazio para corrigir o erro da aula 89 - 90
    this.formulario = this.formBuilder.group({});
    // Isso me tem cara de gambiarra, mas vou tentar seguir a aula da forma
    // mais fiel possível...
    this.estados = new Observable<EstadoBr[]>;
    this.cargos = [];
    this.tecnologias = [];
  }

  ngOnInit(){
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
      }),

      cargo: [null],
      tecnologias: [null]
    });
    // Exemplos de Validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)]

    // this.dropdownService.getEstadosBr()
    // .subscribe((estadosBR: EstadoBr[]) => {
    //   this.estados = estadosBR;
    //   console.log(this.estados);
    // });

    this.estados = this.dropdownService.getEstadosBr();  
    this.cargos = this.dropdownService.getCargos();  
    this.tecnologias = this.dropdownService.getTecnologias();  
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
    let cep: string = this.formulario.get('endereco.cep')?.value;

    if(cep != null && cep !== ''){
      this.cepService.consultaCEP(cep)
      .subscribe((dados: any) => {
        if(dados.erro == 'true'){
          alert('O CEP inserido é inválido ou não foi encontrado.')
          return;
        } else {
          this.populaDadosEndereco(dados);
        }
      });
    }
  }

  populaDadosEndereco(dados: any){
    this.formulario.get('endereco.complemento')?.setValue(dados.complemento)
    this.formulario.get('endereco.rua')?.setValue(dados.logradouro)
    this.formulario.get('endereco.bairro')?.setValue(dados.bairro)
    this.formulario.get('endereco.cidade')?.setValue(dados.localidade)
    this.formulario.get('endereco.estado')?.setValue(dados.uf)
  }

  setarCargo(){
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  compararTecnologias(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.desc === obj2.desc) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }
}
