import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../data/task';

class DisplayedOption {
  id: number;
  value = '';
  isCorrect = false;
}

const isCorrect = (answers: number[], index: number) => {
  return answers.indexOf(index) !== -1;
};

@Component({
  selector: 'app-edit-task-new',
  templateUrl: './edit-task-new.component.html',
  styleUrls: ['./edit-task-new.component.css']
})
export class EditTaskNewComponent implements OnInit {
  id: string;
  answer: number[] = [];
  question = '';
  category = '';
  displayedOptions: DisplayedOption[] = [];
  lastOptionId = 0;

  @Input() task: Task = {
    id: null,
    question: '',
    category: '',
    options: [],
    answer: [],
  };
  @Input() blockActions = false;

  @Output() onSave = new EventEmitter<Task>();
  @Output() onDismiss = new EventEmitter();
  constructor() { }

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

  removeOption(id: number): void {
    this.displayedOptions = this.displayedOptions.filter(option => option.id !== id);
  }

  addOption() {
    const option: DisplayedOption = {
      id: ++this.lastOptionId,
      value: '',
      isCorrect: false,
    };
    this.displayedOptions = [ ...this.displayedOptions, option ];
  }

  handleSave() {
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
    this.onSave.emit(task);
    return false;
  }
  handleDismiss() {
    this.onDismiss.emit();
    return false;
  }

  isSaveDisabled() {
    return this.blockActions ||
      !this.category ||
      !this.question ||
      !this.displayedOptions.find(option => !!option.value) ||
      this.displayedOptions.find(option => !option.value);
  }
}
