import { Task } from './Task';

export class Exam {
  globalExamId: string;
  configuration: Configuration;
}

export class Configuration {
  name;
  ids;
  examContainer;
}

export class UnnormalizedConfiguration {
  name;
  tasks: Task[];
  examContainer;
}

export class UnnormalizedExam {
  globalExamId: string;
  configuration: UnnormalizedConfiguration;
}
