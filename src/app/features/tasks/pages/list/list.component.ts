import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  myTasks$!: Task[];
  selectedTask: Task | null;

  isDesktop = false;

  private _originalTasks: Task[];

  constructor(
    private _tasksService: TasksService,
    private _modalService: ModalService,
    private _alertService: AlertService,
    private _breakpointService: BreakpointService
  ) {
    this.selectedTask = null;
    this._originalTasks = [];
  }

  private getTask(idTask: string): void {
    this._tasksService.getTaskById(idTask).subscribe((data) => {
      this.selectedTask = data;
    });
  }

  private checkBreakpoint(): void {
    this._breakpointService.isDesktop$.subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit(): void {
    this.checkBreakpoint();
    this.getAllTask();
  }

  toggleStatus(idTask: string): void {
    this.getTask(idTask);
    if (this.selectedTask) {
      const updateTask: Task = this.selectedTask;
      updateTask.status = !this.selectedTask.status;
      this._tasksService.updateTask(idTask, updateTask).subscribe((res) => {
        if (res) {
          const message = updateTask.status ? 'Se realizó la tarea' : 'Se marco la tarea por hacer';
          this._alertService.info(message);
          this.getAllTask();
        }
      });
    }
  }

  getAllTask(): void {
    this._tasksService.getAllTasks().subscribe((data) => {
      this.myTasks$ = data;
      this._originalTasks = data;
    });
  }

  openDetailsModal(idTask: string): void {
    this.getTask(idTask);
    this._modalService.open('detailsModal');
  }

  openDeleteTaskModel(idTask: string): void {
    this.getTask(idTask);
    this._modalService.open('deleteTaskModal');
  }

  onTaskFilteredBy(filter: string): void {
    if (filter === '') {
      this.myTasks$ = this._originalTasks;
      return;
    }
    this.myTasks$ = this._originalTasks.filter((task) => {
      if (filter === 'done') {
        return task.status;
      }
      return !task.status;
    });
  }

  onTaskSortedBy(order: string): void {
    if (order === '' || order === 'oldestCreatedFirst') {
      this.myTasks$ = this.myTasks$.sort((current, next) => {
        const currentTaskDate = new Date(current.createdDate);
        const nextTaskDate = new Date(next.createdDate);
        if (currentTaskDate > nextTaskDate) {
          return 1;
        }
        if (currentTaskDate < nextTaskDate) {
          return -1;
        }
        return 0;
      });
      return;
    }
    if (order === 'latestCreatedFirst') {
      this.myTasks$ = this.myTasks$.sort((current, next) => {
        const currentTaskDate = new Date(current.createdDate);
        const nextTaskDate = new Date(next.createdDate);
        if (currentTaskDate > nextTaskDate) {
          return -1;
        }
        if (currentTaskDate < nextTaskDate) {
          return 1;
        }
        return 0;
      });
      return;
    }
  }
}
