import { Component } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-danger">
    </app-poc-base>
  `
})
export class PocComponent {
  nome = 'Componente sem unsubscribe';
  valor: string;

  constructor(private service: EnviarValorService) { 
    this.valor = '';
  }
}
