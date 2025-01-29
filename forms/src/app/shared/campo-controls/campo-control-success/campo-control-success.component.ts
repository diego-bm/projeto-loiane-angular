import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-success',
  templateUrl: './campo-control-success.component.html',
  styleUrls: ['./campo-control-success.component.css']
})
export class CampoControlSuccessComponent {
  @Input() mostrarSucesso: boolean;
  @Input() msgSucesso: string;

  constructor(){
    this.mostrarSucesso = false;
    this.msgSucesso = "";
  }
}
