import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private httpClient: HttpClient) {}

  GetQuestionAnswersCountMistake() {
    return this.httpClient.get(
      environment.endpoint + 'MyAnswer/Get_Question_Answers_Count_mistake'
    );
  }

  GetQuestionAnswersCountRight() {
    return this.httpClient.get(
      environment.endpoint + 'MyAnswer/Get_Question_Answers_Count_Right'
    );
  }
}
