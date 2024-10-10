import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Task } from '../models/task.model';
import { ITask } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private localStorageService: LocalStorageService
  ) { }

  public getAllTasks(): Observable<Task[]> {
    return new Observable((observer) => {
      try {
        const tasks = this.localStorageService.getItem<Task[]>('tasks');
        observer.next(tasks ?? []);
      } catch (error) {
        console.error('TasksService', error);
        observer.error(error);
      } finally {
        observer.complete();
      }
    });
  }

  public getTaskById(id: string): Observable<Task | null> {
    return new Observable((observer) => {
      try {
        const tasks = this.localStorageService.getItem<Task[]>('tasks');
        if (tasks) {
          const taskFound = tasks.find((t) => t.id === id);
          observer.next(taskFound);
        } else {
          observer.next(null);
        }
      } catch (error) {
        console.error('TasksService', error);
        observer.error(error);
      } finally {
        observer.complete();
      }
    });
  }

  public saveTask(task: Task): Observable<Task | null> {
    return new Observable((observer) => {
      try {
        const tasks = this.localStorageService.getItem<ITask[]>('tasks') ?? [];
        tasks.push(task.me as ITask);
        const saved = this.localStorageService.setItem<ITask[]>('tasks', tasks);
        observer.next(saved ? task : null);
      } catch (error) {
        console.error('TasksService', error);
        observer.error(error);
      } finally {
        observer.complete();
      }
    });
  }

  public updateTask(id: string, updatedTask: Task): Observable<Task | null> {
    return new Observable((observer) => {
      try {
        const data = this.localStorageService.getItem<Task[]>('tasks');
        if (data) {
          const tasks = data.map((t) => Task.fromData(t));
          const taskIndex = tasks.findIndex((t) => t.id === id);
          if (taskIndex !== -1) {
            tasks[taskIndex].update(updatedTask);
            const news = tasks.map((t) => t.me);
            const saved = this.localStorageService.setItem<ITask[]>('tasks', news);
            observer.next(saved ? tasks[taskIndex] : null);
          } else {
            observer.next(null);
          }
        } else {
          observer.next(null);
        }
      } catch (error) {
        console.error('TasksService', error);
        observer.error(error);
      } finally {
        observer.complete();
      }
    });
  }

  public deleteTask(id: string): Observable<boolean> {
    return new Observable((observer) => {
      try {
        const tasks = this.localStorageService.getItem<Task[]>('tasks');
        if (tasks) {
          const tasksFiltered = tasks.filter((t) => t.id !== id);
          if (tasksFiltered.length !== tasks.length) {
            this.localStorageService.setItem<Task[]>('tasks', tasksFiltered);
            observer.next(true);
          } else {
            observer.next(false);
          }
        } else {
          observer.next(false);
        }
      } catch (error) {
        console.error('TasksService', error);
        observer.error(error);
      } finally {
        observer.complete();
      }
    });
  }
}
