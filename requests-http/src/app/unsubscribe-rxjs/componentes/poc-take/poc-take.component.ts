import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-poc-take',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-info">
    </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit, OnDestroy {
  nome = 'Componente com take';
  valor: string;

  constructor(private service: EnviarValorService) { 
    this.valor = '';
  }

  ngOnInit(): void {
    this.service.getValor()
    .pipe(
      tap(v => console.log(this.nome, v)),
      take(1)
    )
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruído.`)
  }
}
