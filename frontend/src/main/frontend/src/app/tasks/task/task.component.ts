import { Component, Input, OnInit } from '@angular/core';

import { Task } from '../../data/task';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task = new Task();
  constructor() {
  }

  ngOnInit() {
  }

  isCorrect(i: number) {
    return this.task.answer.indexOf(i) !== -1;
  }
}
