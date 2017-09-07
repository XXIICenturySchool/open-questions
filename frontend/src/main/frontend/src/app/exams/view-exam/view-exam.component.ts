import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
        if (this.exam.configuration.examContainer) {
          for (const key in this.exam.configuration.examContainer) {
            if (this.exam.configuration.examContainer.hasOwnProperty(key)) {
              this.examContainerKeys.push(key);
            }
          }
        }
        console.log(exam);
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
