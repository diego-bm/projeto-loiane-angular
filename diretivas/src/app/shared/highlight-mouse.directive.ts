import { Directive, HostListener, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {
  @HostListener('mouseenter') onMouseOver(){
    //this._renderer2.setStyle(this._elementRef.nativeElement, 'background-color', 'yellow');
    this._backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave(){
    //this._renderer2.setStyle(this._elementRef.nativeElement, 'background-color', 'white');
    this._backgroundColor = 'white';
  }

  // @HostBinding('style.backgroundColor') backgroundColor: string = '';
  @HostBinding('style.backgroundColor') get setColor(){
    //codigo extra
    // Se for necessária qualquer manipulação extra da variável
    // antes de setar o seu valor, a gente pode usar essa forma
    // com os getters e setters do TypeScript
    return this._backgroundColor;
  };

  private _backgroundColor: string = '';

  constructor(/*private _elementRef: ElementRef, private _renderer2: Renderer2*/) { }

}
