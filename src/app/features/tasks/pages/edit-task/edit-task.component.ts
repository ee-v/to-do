import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html'
})
export class EditTaskComponent implements OnInit {
  task!: Task;
  form: FormGroup;

  get descriptionField() { return this.form.get('description'); }
  get statusField() { return this.form.get('status'); }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _alertService: AlertService,
    private _tasksService: TasksService,
    private _fb: FormBuilder,
    private _datePipe: DatePipe
  ) {
    this.form = this._fb.group({
      description: ['', Validators.required],
      deadLine: [''],
      status: [false]
    });
  }

  ngOnInit(): void {
    const taskId = this._route.snapshot.paramMap.get('id');
    if (taskId === null) {
      return;
    }
    this.getTask(taskId);
  }

  private getTask(id: string): void {
    this._tasksService.getTaskById(id).subscribe((task) => {
      if (task !== null) {
        this.task = task;
        const { description, deadLine, status } = task;
        this.form.patchValue({
          description,
          deadLine: this.formatDate(deadLine!),
          status
        })
      }
    });
  }

  private formatDate(date: string): string {
    return this._datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }

  onCancel(): void {
    this._router.navigate(['/tasks']);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { description, deadLine, status } = this.form.value;
      const updatedTask = new Task(description, deadLine === '' ? undefined : deadLine);
      updatedTask.status = status;
      this._tasksService.updateTask(this.task.id, updatedTask).subscribe((res) => {
        if (res) {
          this._alertService.success('Se actualizo');
          console.info({ prev: this.task, updated: res });
          this._router.navigate(['/tasks']);
        }
      });
    }
  }

  onClick(event: MouseEvent): void {
    const dateInput = event.target as HTMLInputElement & { showPicker: () => void };
    dateInput.showPicker();
  }
}
