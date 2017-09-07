import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamsComponent} from './exams/exams.component';
import { TasksComponent } from './tasks/tasks.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { ViewExamComponent } from './exams/view-exam/view-exam.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { CreateExamComponent } from './exams/create-exam/create-exam.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'exams',  component: ExamsComponent },
  { path: 'tasks',  component: TasksComponent },
  { path: 'exams/create', component: CreateExamComponent },
  { path: 'exams/:id', component: ViewExamComponent },
  { path: 'tasks/create', component: EditTaskComponent },
  { path: 'tasks/:id', component: ViewTaskComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
