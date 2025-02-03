import { Component } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-secondary">
    </app-poc-base>
  `
})
export class PocUnsubComponent {
  nome = 'Componente com unsubscribe';
  valor: string;

  constructor(private service: EnviarValorService) { 
    this.valor = '';
  }
}
