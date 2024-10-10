import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;
  @HostListener('window:keyup', ['$event'])
  handleKeyEsc(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  @Input() name!: string;
  @Input() task!: Task | null;

  statusText: string;

  constructor(private _modalService: ModalService) {
    this.statusText = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task.currentValue) {
      this.generateStatusText();
    }
  }

  ngAfterViewInit(): void {
    this._modalService.register(this.name, this.modalRef);
  }

  ngOnDestroy(): void {
    this._modalService.unregister(this.name);
  }

  close(): void {
    this._modalService.close(this.name);
  }

  backdropClick(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if (!element.closest('.modal-box')) {
      this.close();
    }
  }

  private generateStatusText(): void {
    this.statusText = this.task?.status ? 'Realizada' : 'Por hacer';
  }

}
