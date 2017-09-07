import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Task } from '../../data/task';

const createEmptyTask = (): Task => {
  return {
    id: '',
    question: '',
    category: '',
    answer: [],
    options: [],
  };
};

const isCorrect = (answers: number[], index: number) => {
  return answers.indexOf(index) !== -1;
};


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task = createEmptyTask();
  @Output() onSubmit = new EventEmitter<Task>();
  id = null;
  question = '';
  category = '';
  answer = [];
  displayedOptions: any[];
  lastOptionId: number;
  constructor() {
  }

  ngOnInit() {
    this.id = this.task.id;
    this.question = this.task.question;
    this.category = this.task.category;
    this.answer = [ ...this.task.answer ];
    this.displayedOptions = this.task.options.map(
      (value, index) => ({
        id: index,
        value,
        isCorrect: isCorrect(this.answer, index)
      })
    );
    this.lastOptionId = this.displayedOptions.length;
  }
  onSubmitClicked(): void {
    const task: Task = {
      id: this.id,
      question: this.question,
      category: this.category,
      answer: this.displayedOptions
        .map((option, index) => ({ index, isCorrect: option.isCorrect }))
        .filter((correctnessWithIndex) => correctnessWithIndex.isCorrect)
        .map((correctnessWithIndex) => correctnessWithIndex.index),
      options: this.displayedOptions.map(option => option.value),
    };

    this.onSubmit.emit(task);
  }

  removeOption(id: number): void {
    this.displayedOptions = this.displayedOptions.filter(option => option.id !== id);
  }

  addOption() {
    this.displayedOptions.push({
      id: ++this.lastOptionId,
      value: '',
    });
  }
}
