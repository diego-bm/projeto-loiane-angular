import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
  modalRef: BsModalRef = new BsModalRef;

  @Input() message: string;
  @Input() type: string = 'md-local';

  constructor(private modalService: BsModalService) {
    this.message = '';
  }

  onClosed(){
    this.modalRef.hide();
  }

}
