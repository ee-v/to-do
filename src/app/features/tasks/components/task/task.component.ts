import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Output() toggleStatus = new EventEmitter<string>();
  @Output() showDetails = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public changeStatus(id: string) {
    this.toggleStatus.emit(id);
  }

  public openModalDetails(id: string) {
    this.showDetails.emit(id);
  }

  public openModalDelete(id: string) {
    this.delete.emit(id);
  }
}
