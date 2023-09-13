import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loiane.com';
  cursoAngular: boolean = true;
  urlImagem: string = 'https://picsum.photos/400/200?random=1'
  urlImagem2: string = 'https://picsum.photos/400/200?random=2'
  urlImagem3: string = 'https://picsum.photos/400/200?random=3'

  valorAtual: string = '';
  valorSalvo: string = '';

  isMouseOver: boolean = false;

  nomeDoCurso: string = 'Angular';

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  botaoClicado(){
    alert('Botão clicado!');
  }

  onKeyUpMeu(tecla: string){
    console.log(tecla);

  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value
  }

  salvarValor(valor: string){
    this.valorSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento: {novoValor: number}){
    console.log(evento.novoValor);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
