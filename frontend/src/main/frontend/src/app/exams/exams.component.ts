import { Component, OnInit } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { Exam } from '../data/exam';
import { Router } from '@angular/router';

import _ from 'lodash';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  exams: Exam[] = [];
  constructor(private examService: ExamService,
              private router: Router) { }

  ngOnInit() {
    this.examService.getExams().then((exams) => this.exams = exams);
  }

  getExamType(exam: Exam): string {
    let configuration = exam.configuration;
    const hasIds = (configuration.ids && configuration.ids.length);
    const hasTemplates = (configuration.examContainer && _.keys(configuration.examContainer).length);
    if (hasIds && hasTemplates) {
      return 'mixed';
    }
    if (!hasIds && hasTemplates) {
      return 'generated';
    }
    return 'predefined';
  }

  handleViewClick(exam: Exam) {
    console.log('here');
    this.router.navigate(['/exams', exam.globalExamId]);
  }

  createExam() {
    this.router.navigate(['/exams', 'create']);
  }
}
