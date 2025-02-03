import { Component } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';

@Component({
  selector: 'app-poc-take-until',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent {
  nome = 'Componente com takeUntil';
  valor: string;

  constructor(private service: EnviarValorService) { 
    this.valor = '';
  }
}
