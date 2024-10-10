import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: { animation: 'ListTasksPage' }
  },
  {
    path: 'new-task',
    component: NewTaskComponent,
    data: { animation: 'NewTaskPage' }
  }, {
    path: ':id',
    component: EditTaskComponent,
    data: { animation: 'EditTaskPage' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
