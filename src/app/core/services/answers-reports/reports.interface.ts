export interface GeneralReport {
  $id: string;
  totalUsers: number;
  totalVideos: number;
  totalCategories: number;
  totalQuestions: number;
  registerUserCountPerDay: RegisterUserCountPerDay;
  rightQuestionsAnswers: RightQuestionsAnswers;
  wrongQuestionsAnswers: WrongQuestionsAnswers;
  wrongSentenceAnswers: WrongSentenceAnswers;
  rightSentenceAnswers: RightSentenceAnswers;
}

export interface Value {
  $id: string;
  count: number;
  day: Date;
}

export interface RegisterUserCountPerDay {
  $id: string;
  $values: Value[];
}

export interface Value2 {
  $id: string;
  id: number;
  name: string;
}

export interface RightQuestionsAnswers {
  $id: string;
  $values: Value2[];
}

export interface Value3 {
  $id: string;
  id: number;
  name: string;
}

export interface WrongQuestionsAnswers {
  $id: string;
  $values: Value3[];
}

export interface Value4 {
  $id: string;
  id: number;
  name: string;
}

export interface WrongSentenceAnswers {
  $id: string;
  $values: Value4[];
}

export interface RightSentenceAnswers {
  $id: string;
  $values: any[];
}
