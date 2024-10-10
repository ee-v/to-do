import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modals: { [name: string]: ElementRef<HTMLDialogElement> } = {};

  register(name: string, modalRef: ElementRef<HTMLDialogElement>): void {
    this._modals[name] = modalRef;
  }

  open(name: string): void {
    const modal = this._modals[name];
    if (modal) {
      modal.nativeElement.classList.add('modal-open');
    } else {
      console.error(`No se encontro el modal'${name}'.`);
    }
  }

  close(name: string): void {
    const modal = this._modals[name];
    if (modal) {
      modal.nativeElement.classList.remove('modal-open')
    } else {
      console.error(`No se encontro el modal'${name}'.`);
    }
  }

  unregister(name: string): void {
    if (this._modals[name]) {
      delete this._modals[name];
    }
  }
}
