import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {

  @Input() message: string;
  @Input() type: string = 'success';

  constructor(public bsModalRef: BsModalRef) {
    this.message = '';
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
