import { Component, OnInit } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { Exam } from '../data/exam';
import { Router } from '@angular/router';

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
    if (exam.configuration.ids && exam.configuration.examContainer) {
      return 'mixed';
    }
    if (!exam.configuration.ids && exam.configuration.examContainer) {
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
