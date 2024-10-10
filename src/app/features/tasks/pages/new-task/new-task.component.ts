import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html'
})
export class NewTaskComponent implements OnInit {
  form: FormGroup;

  get descriptionField() {
    return this.form.get('description');
  }

  constructor(
    private _fb: FormBuilder,
    private _tasksService: TasksService,
    private _router: Router,
    private _alertService: AlertService
  ) {
    this.form = this._fb.group({
      description: ['', Validators.required],
      deadLine: ['']
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const { description, deadLine } = this.form.value;
      const newTask = new Task(description, deadLine === '' ? undefined : deadLine);
      await this._tasksService.saveTask(newTask).subscribe((res) => {
        if (res) {
          this._alertService.success('Se guardo');
          console.info(res);
          this._router.navigate(['/tasks'])
        }
      });
    }
  }

  onCancel(): void {
    this._router.navigate(['/tasks'])
  }

  onClick(event: MouseEvent): void {
    const dateInput = event.target as HTMLInputElement & { showPicker: () => void };
    dateInput.showPicker();
  }
}
