import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

// Assim como o Input, os outputs também podem ser declarados nos metadados
// do componente. Entretanto, fica mais fácil de ler e localizar se usarmos
// os decorators.
@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css']//,
  //outputs: ['mudouValor']
})
export class OutputPropertyComponent implements OnInit {

  @Input() valor: number = 0;

  @Output() mudouValor = new EventEmitter();

  // O "!" serve para dizer ao Typescript que tenho certeza que essa variável
  // terá um valor atribuído antes de ser usado. Se não estivesse usando o ViewChild,
  // o certo seria inicializar um objeto vazio no construtor para que não ocorra
  // erros com null ou undefined. Entretanto, como eu já irei atribuir um elemento
  // HTML a essa variável por conta do ViewChild, eu já estou garantindo que o
  // objeto será preenchido. Em teoria, eu até posso inicializar a variável no
  // construtor, mas ela já será sobrescrita pelo ViewChild. Então, para deixar
  // mais fácil de ler e seguir as boas práticas, é melhor usar o operador de afirmação
  // não nula (!).
  // -----
  // Também utilizamos o HTMLElement para saber qual o tipo do nosso elemento,
  // dando um console.log nele. Descobrimos que é um ElementRef.
  // @ViewChild('campoInput') campoValorInput!: HTMLElement;

  @ViewChild('campoInput') campoValorInput!: ElementRef;

  incrementa(){
    this.campoValorInput.nativeElement.value++;
    this.mudouValor.emit({novoValor: this.valor});
  }

  decrementa(){
    this.campoValorInput.nativeElement.value--;
    this.mudouValor.emit({novoValor: this.valor});
  }

  constructor() { }

  ngOnInit(): void {
  }

}
