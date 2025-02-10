import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
  @Input() message: string;
  @Input() type: string = 'md-local';

  constructor(private modalRef: BsModalRef) {
    this.message = '';
  }

  onClosed(){
    this.modalRef.hide();
  }

}
