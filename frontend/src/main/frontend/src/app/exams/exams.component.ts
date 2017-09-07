import { Component, OnInit } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { Exam } from '../data/exam';
import { Router } from '@angular/router';
import { PagingEngine } from '../paging/paging';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  pagingEngine: PagingEngine<Exam>;
  exams: Exam[] = [];
  constructor(private examService: ExamService,
              private router: Router) { }

  ngOnInit() {
    this.examService.getExams().then((exams) => this.exams = exams);
    this.pagingEngine = new PagingEngine<Exam>(4, (state) => this.examService.fetchExams(state));
    this.pagingEngine.postViewUpdate();
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
