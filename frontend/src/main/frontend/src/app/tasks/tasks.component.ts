import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../data/task';
import { TaskService } from '../service/task.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() hasAddAction = false;
  @Output() onAdd = new EventEmitter<Task>();
  editing = false;
  editingTask: Task;
  blockEditing = false;
  blockCreating = false;
  creating = false;
  closeResult: string;
  public tasks: Task[] = [];

  constructor(private taskService: TaskService,
              private router: Router) {
  }

  ngOnInit() {
    this.update();
  }
  update() {
    return this.taskService.getTasks(0).then((tasks) => this.tasks = tasks);
  }

  editTask(task: Task) {
    this.editing = true;
    this.editingTask = task;
    return false;
  }

  createTask(content) {
    this.creating = true;
  }

  removeTask(id: string) {
    this.taskService.removeTask(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
    return false;
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  handleCreatingDismiss() {
    this.creating = false;
  }

  handleEditingDismiss() {
    this.editing = false;
  }

  handleEditingSave(taskToSave: Task) {
    this.blockEditing = true;
    return this.taskService
      .saveTask(taskToSave)
      .then(() => this.update())
      .then(() => {
        this.blockEditing = false;
        this.editing = false;
      });
  }

  handleCreatingSave(taskToSave: Task) {
    console.log('here');
    this.blockCreating = true;
    return this.taskService.saveTask(taskToSave)
      .then(() => this.update())
      .then(() => {
        this.creating = false;
        this.blockCreating = false;
      });
  }

  addTask(task: Task) {
    this.onAdd.emit(task);
  }
}
