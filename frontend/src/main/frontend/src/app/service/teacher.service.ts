import { Injectable } from '@angular/core';

@Injectable()
export class TeacherService {
  teacherId = 'dev_teacher_id';

  constructor() {
    this.teacherId = window.localStorage.getItem('teacherId');
  }
  setTeacherId(teacherId: string) {
    window.localStorage.setItem('teacherId', teacherId);
    this.teacherId = teacherId;
  }
  getTeacherId(): string {
    return this.teacherId;
  }
}
