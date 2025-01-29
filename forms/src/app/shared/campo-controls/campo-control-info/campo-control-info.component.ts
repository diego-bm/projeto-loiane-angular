import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-info',
  templateUrl: './campo-control-info.component.html',
  styleUrls: ['./campo-control-info.component.css']
})
export class CampoControlInfoComponent {
  @Input() mostrarInfo: boolean;
  @Input() msgInfo: string;

  constructor(){
    this.mostrarInfo = false;
    this.msgInfo = "";
  }
}