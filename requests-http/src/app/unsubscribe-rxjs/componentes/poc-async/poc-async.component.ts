import { Component } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';


@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-success">
    </app-poc-base>
  `
})
export class PocAsyncComponent {
  nome = 'Componente com async';
  valor: string;

  constructor(private service: EnviarValorService) { 
    this.valor = '';
  }
}
