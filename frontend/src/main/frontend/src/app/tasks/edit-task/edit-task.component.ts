import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { Task } from '../../data/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @Input() task: Task;
  saving = false;
  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.taskService.getTask(params.get('id')))
      .subscribe((task: Task) => {
        this.task = task;
        console.log(this.task);
      }, (error) => {
        this.task = new Task();
      });
  }

  onSubmit(task: Task): void {
    this.saving = true;
    this.taskService.saveTask(task)
      .then(() => this.location.back());
  }
  goBack(): void {
    this.location.back();
  }

}
