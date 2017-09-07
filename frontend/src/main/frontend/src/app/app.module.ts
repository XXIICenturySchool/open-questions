import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TaskService } from './service/task.service';

import { AppComponent } from './app.component';
import { ExamsComponent } from './exams/exams.component';
import { AppRoutingModule } from './app-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { EditTaskNewComponent } from './tasks/edit-task-new/edit-task-new.component';
import { ExamService } from './service/exam.service';
import { ViewExamComponent } from './exams/view-exam/view-exam.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { CreateExamComponent } from './exams/create-exam/create-exam.component';
import { TeacherService } from './service/teacher.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamsComponent,
    TasksComponent,
    TaskComponent,
    TaskFormComponent,
    EditTaskComponent,
    EditTaskNewComponent,
    ViewExamComponent,
    ViewTaskComponent,
    CreateExamComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  providers: [ TaskService, ExamService, TeacherService ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
