import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  @Input() title: string = '';
  @Input() msg: string = '';
  @Input() cancelTxt: string = 'Cancelar';
  @Input() okTxt: string = 'Sim';

  constructor(private bsModalRef: BsModalRef) { }

  onClose() {
    this.bsModalRef.hide();
  }

  onConfirm() {

  }

}
