import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.css']//,
  //inputs: ['nomeCurso:nome']
})
//Dá para colocar os inputs nos metadados, mas é difícil de ler, então prefira o decorator.
export class InputPropertyComponent implements OnInit {

  @Input('nome') nomeCurso: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
