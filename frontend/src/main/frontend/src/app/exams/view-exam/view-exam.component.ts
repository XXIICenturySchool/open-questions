import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import _ from 'lodash';

import { ExamService } from '../../service/exam.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UnnormalizedExam } from '../../data/exam';
import { Task } from '../../data/Task';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit {

  exam: UnnormalizedExam;
  examContainerKeys: string[] = [];
  constructor(private examService: ExamService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.examService.getExam(params.get('id')))
      .subscribe(exam => {
        this.exam = exam;
        const examContainer = this.exam.configuration.examContainer && {};
        this.examContainerKeys = _.keys(examContainer);
      });
  }

  goBack(): void {
    this.router.navigate(['/exams']);
  }

  goToTask(task: Task) {
    this.router.navigate(['/tasks', task.id]);
    return false;
  }
}
