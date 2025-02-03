import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';
import { EMPTY, Observable, of, tap } from 'rxjs';


@Component({
  selector: 'app-poc-async',
  // ?? -> nullish coalescing operator.
  // Garante que null seja substituído por um valor padrão.
  template: `
    <app-poc-base [nome]="nome"
      [valor]="(valor$ | async) ?? ''" estilo="bg-success">
    </app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit, OnDestroy {
  nome = 'Componente com async';
  valor$: Observable<string>;

  constructor(private service: EnviarValorService) { 
    this.valor$ = of('');
  }

  ngOnInit(): void {
    this.valor$ = this.service.getValor()
    .pipe(
      tap(v => console.log(this.nome, v))
    );
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruído.`)
  }
}
