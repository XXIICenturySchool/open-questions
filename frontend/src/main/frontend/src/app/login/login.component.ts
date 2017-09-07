import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private teacherService: TeacherService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const teacherId: string = params['teacherId'];
      if (teacherId) {
        this.teacherService.setTeacherId(teacherId);
      }
      this.router.navigate(['exams']);
    });
  }

}
