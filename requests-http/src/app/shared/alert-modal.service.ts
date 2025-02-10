import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

constructor(private modalService: BsModalService) { }

private showAlert(message: string, type: AlertTypes) {
  const modalRef: BsModalRef = this.modalService.show(AlertModalComponent);
  modalRef.content.type = type;
  modalRef.content.message = message;
}

showAlertDanger(message: string) {
  this.showAlert(message, AlertTypes.DANGER);
}

showAlertSuccess(message: string) {
  this.showAlert(message, AlertTypes.SUCCESS);
}

}
