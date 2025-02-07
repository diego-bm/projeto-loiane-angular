import { Component, TemplateRef, RendererFactory2 } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-modal-service-static',
  templateUrl: './demo-modal-service-static.component.html',
  standalone: false
})
export class DemoModalServiceStaticComponent {
  modalRef: BsModalRef = new BsModalRef;
  constructor(
    private modalService: BsModalService
  ) {}

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
