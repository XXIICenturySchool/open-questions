import { Exam } from '../data/exam';

export const EXAMS: Exam[] = [
  {
    globalExamId: '1',
    configuration: {
      name: 'exam_with_ids',
      ids: ['1', '2'],
      examContainer: null,
    }
  },
  {
    globalExamId: '2',
    configuration: {
      name: 'exam_with_container',
      ids: null,
      examContainer: {
        time: 3,
        money: 1,
      },
    }
  },
  {
    globalExamId: '3',
    configuration: {
      name: 'exam_mixed',
      ids: ['1', '2'],
      examContainer: {
        time: 3,
        money: 1,
      },
    }
  },
];
