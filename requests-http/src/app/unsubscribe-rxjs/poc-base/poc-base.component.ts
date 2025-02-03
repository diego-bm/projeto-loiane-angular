import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poc-base',
  templateUrl: './poc-base.component.html',
  styleUrls: ['./poc-base.component.scss']
})
export class PocBaseComponent {
  @Input() nome: string;
  @Input() valor: string;
  @Input() estilo: string;

  constructor() { 
    this.nome = '';
    this.valor = '';
    this.estilo = '';
  }
}
