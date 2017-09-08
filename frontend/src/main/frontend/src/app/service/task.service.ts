import { Injectable } from '@angular/core';
import { Task } from '../data/Task';
import { TASKS } from './mock-tasks';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

const serverTaskEntityToTask = (serverEntity: any): Task => {
  return {
    id: serverEntity.id,
    question: serverEntity.question,
    category: serverEntity.category,
    answer: serverEntity.answer.map(a => +a),
    options: serverEntity.options,
  };
};


@Injectable()
export class TaskService {
  tasks = TASKS;
  constructor(private http: Http) { }

  saveTask(taskToSave: Task): Promise<Task> {
    taskToSave.category = taskToSave.category.toLowerCase();
    return this.http.post('/api/tasks', taskToSave).toPromise()
      .then(response => response.json());
  }

  getTasks(page: number = 0, size: number = 20): Promise<Task[]> {
    return this.http.get('/api/tasks').toPromise()
      .then(response => response.json()._embedded.tasks)
      .then(serverEntities => serverEntities.map(serverTaskEntityToTask))
      .catch((err) => console.log(err));
  }

  getTask(id: string): Promise<Task> {
    return this.http.get(`/api/tasks/${id}`).toPromise()
      .then(response => response.json())
      .then(json => {
        console.log(json);
        return serverTaskEntityToTask(json);
      });
  }
}
