import { Component, OnInit } from '@angular/core';
import { Task } from '../../data/Task';
import { ExamService } from '../../service/exam.service';
import { Configuration } from '../../data/exam';
import { Router } from '@angular/router';

interface Template {
  id: number;
  category: string;
  value: number;
}


@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  name = '';
  tasks: Task[] = [];
  templates: Template[] = [];

  withTasks = false;
  withTemplates = false;

  saving = false;

  lastTemplateId = 0;
  addingTask = false;

  constructor(private examService: ExamService,
              private router: Router) {}

  ngOnInit() {
  }

  addTemplate() {
    this.templates.push({
      id: this.lastTemplateId++,
      category: '',
      value: 0,
    });
  }

  addTask() {
    this.addingTask = true;
  }

  dismissTaskAdding() {
    this.addingTask = false;
  }

  handleTaskSelected(task) {
    this.addingTask = false;
    const taskAlreadyAdded = !!this.tasks.find(t => t.id === task.id);
    if (taskAlreadyAdded) {
      return false;
    }
    this.tasks.push(task);
    return false;
  }

  taskRemove(task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    return false;
  }

  removeTemplate(template) {
    this.templates = this.templates.filter(value => value.id !== template.id);
  }

  onCreate() {
    // name ids examContainer
    const examContainer = {};
    console.log(this.templates);
    this.saving = true;
    this.templates.forEach(t => examContainer[t.category] = t.value);
    const configuration: Configuration = {
      name: this.name,
      ids: this.tasks.map(t => t.id),
      examContainer,
    };
    this.examService.createConfiguration(configuration)
      .then((exam) => {
        this.router.navigate(['/exams', exam.globalExamId]);
      });
  }

  isSaveDisabled() {
    return this.saving || !this.name;
  }

}
