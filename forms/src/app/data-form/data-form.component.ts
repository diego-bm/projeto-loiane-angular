// Na aula, a Loiane apenas importa o Http no módulo e ele funciona. Aqui,
// eu fui forçado a manter o import no componente. Manterei assim.
// Provavelmente é uma mudança nos Angulars mais recentes.
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { EMPTY, empty, map, Observable, switchMap, tap } from 'rxjs';
import { FormValidations } from '../shared/services/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent {

  // formulario: FormGroup;
  estados: EstadoBr[];
  cidades: Cidade[];
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();

    // Inicializando formGroup vazio para corrigir o erro da aula 89 - 90
    this.formulario = this.formBuilder.group({});
    // Isso me tem cara de gambiarra, mas vou tentar seguir a aula da forma
    // mais fiel possível...
    this.estados = [];
    this.cidades = [];
    this.cargos = [];
    this.tecnologias = [];
    this.newsletterOp = [];
  }

  ngOnInit(){
    // this.estados = this.dropdownService.getEstadosBr();  
    this.dropdownService.getEstadosBr()
      .subscribe((dados: EstadoBr[]) => this.estados = dados);
    
    this.cargos = this.dropdownService.getCargos();  
    this.tecnologias = this.dropdownService.getTecnologias();  
    this.newsletterOp = this.dropdownService.getNewsletter();

    // this.verificaEmailService.verificarEmail('email@email.com').subscribe();

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
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required, FormValidations.cepValidator],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });
    // Exemplos de Validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)]

    // this.dropdownService.getEstadosBr()
    // .subscribe((estadosBR: EstadoBr[]) => {
    //   this.estados = estadosBR;
    //   console.log(this.estados);
    // });

    // Fazer isso quebra a funcionalidade de filtrar o CEP através de RegEx
    this.getCampo('endereco.cep')?.statusChanges
    .pipe(
      tap(value => console.log('status CEP: ', value)),
      switchMap(status => status === 'VALID'
        ? this.cepService.consultaCEP(this.getCampo('endereco.cep')?.value)
        // Diferente do da Loiane por que agora o empty é uma constante
        : EMPTY
      )
    )
    .subscribe(dados => dados ? this.populaDadosEndereco(dados) : {});

    this.getCampo('endereco.estado')?.valueChanges
      .pipe(
        tap((estado: string) => console.log('Novo estado: ', estado)),
        map((estado: string) => this.estados.filter((e: EstadoBr) => e.sigla === estado)),
        map((estados: EstadoBr[]) => estados && estados.length > 0 ? estados[0].id : 0),
        switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe((cidades: Cidade[]) => this.cidades = cidades);

    // this.dropdownService.getCidades(8).subscribe(console.log);
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

    // return this.formBuilder.array([
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false)
    // ])
  }

  override submit(): void {
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: number) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    });

    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe(dados => {
        console.log(dados);
        // reseta o form;
        this.resetar();
      },
      (error: any) => alert('erro')
      );
  }

  consultaCEP(){
    let cep: string = this.getCampo('endereco.cep')?.value;

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
    this.getCampo('endereco.complemento')?.setValue(dados.complemento)
    this.getCampo('endereco.rua')?.setValue(dados.logradouro)
    this.getCampo('endereco.bairro')?.setValue(dados.bairro)
    this.getCampo('endereco.cidade')?.setValue(dados.localidade)
    this.getCampo('endereco.estado')?.setValue(dados.uf)
  }

  setarCargo(){
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.getCampo('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  compararTecnologias(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.desc === obj2.desc) : obj1 === obj2;
  }

  setarTecnologias() {
    this.getCampo('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }

  getControlsFrameworksFormArray(){
    return (this.getCampo('frameworks') as FormArray).controls;
  }

  verificaCepInvalido(){
    return <boolean>(this.getCampo('endereco.cep')?.hasError('cepInvalido'));
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
    .pipe(map((emailExiste: boolean) => emailExiste ? { emailCadastrado: true } : null))
  }

}


