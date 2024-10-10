import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html'
})
export class DeleteTaskComponent implements OnDestroy, AfterViewInit {
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;
  @HostListener('window:keyup', ['$event'])
  handleKeyEsc(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  @Input() name!: string;
  @Input() task?: Task | null;
  @Output() onDelete = new EventEmitter();

  constructor(
    private _modalService: ModalService,
    private _service: TasksService
  ) { }

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

  deleteTask(): void {
    this._service.deleteTask(this.task!.id).subscribe((res) => {
      if (res) {
        alert('Se elimino');
        console.info(this.task);
        this._modalService.close(this.name);
        this.onDelete.emit();
      }
    });
  }
}
