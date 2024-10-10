import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListComponent } from './pages/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { DetailsComponent } from './pages/details/details.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { DeleteTaskComponent } from './pages/delete-task/delete-task.component';
import { TaskFilterSortComponent } from './components/task-filter-sort/task-filter-sort.component';
import { RadioOptionsTooltipComponent } from './components/task-filter-sort/radio-options-tooltip/radio-options-tooltip.component';


@NgModule({
  declarations: [
    ListComponent,
    TaskComponent,
    DetailsComponent,
    NewTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    TaskFilterSortComponent,
    RadioOptionsTooltipComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class TasksModule { }
