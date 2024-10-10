import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimationEvent } from "@angular/animations";
import { alertAnimation } from '../../animations/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [alertAnimation]
})
export class AlertComponent {
  @Input() type?: string;
  @Input() message?: string;
  @Output() onClose = new EventEmitter<void>();

  state = 'visible';

  close(): void {
    this.state = 'void';
  }

  animationDone(e: AnimationEvent) {
    if (e.fromState === 'visible' && e.toState === 'void') {
      this.onClose.emit();
    }
  }
}
