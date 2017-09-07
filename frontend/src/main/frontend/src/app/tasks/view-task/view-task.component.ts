import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Task } from '../../data/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  @Input() task: Task;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    if (!this.task) {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.taskService.getTask(params.get('id')))
        .subscribe((task: Task) => {
          this.task = task;
          console.log(this.task);
        }, (error) => {
          this.task = new Task();
        });
    }
  }
  goBack(): void {
    this.location.back();
  }
}
