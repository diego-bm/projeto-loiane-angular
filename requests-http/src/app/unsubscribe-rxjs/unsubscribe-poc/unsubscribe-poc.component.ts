import { Component } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-unsubscribe-poc',
  templateUrl: './unsubscribe-poc.component.html',
  styleUrls: ['./unsubscribe-poc.component.scss']
})
export class UnsubscribePocComponent {
  mostrarComponentes = true;

  constructor(private service: EnviarValorService) { }

  emitirValor(valor: string) {

  }

  destruirComponentes() {
    this.mostrarComponentes = !this.mostrarComponentes;
  }
}
