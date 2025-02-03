import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-poc-take-until',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {
  nome = 'Componente com takeUntil';
  valor: string;

  unsub$ = new Subject();

  constructor(private service: EnviarValorService) { 
    this.valor = '';
  }

  ngOnInit(): void {
    this.service.getValor()
    .pipe(
      tap(v => console.log(this.nome, v)),
      takeUntil(this.unsub$)
    )
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    this.unsub$.next(this.valor);
    this.unsub$.complete();
    console.log(`${this.nome} foi destruído.`)
  }
}
