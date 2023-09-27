import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngElse]'
})
export class NgElseDirective {
  // Esse código é muito semelhante ao que o ngIf original faz!
  // Compensa dar uma olhada na documentação do Angular e ver
  // o código fonte de alguns componentes e diretivas dele para
  // desmistificar o Framework. Este aqui já é um código mais
  // avançado.
  @Input() set ngElse(condition: boolean){
    if (!condition){
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainerRef.clear();
    }
  }

  constructor(private _templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef) { }

}
