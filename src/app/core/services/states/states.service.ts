import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private _HttpClient: HttpClient) {}

  GetQuestionAnswersCount(IdUser: number) {
    return this._HttpClient.get(
      environment.endpoint + 'MyAnswer/Get_Question_Answers_Count',
      { params: { IdUser } }
    );
  }
  GetQuestionAnswersCountMistake(IdUser: number) {
    return this._HttpClient.get(
      environment.endpoint + 'MyAnswer/Get_Question_Answers_Count_mistake',
      { params: { IdUser } }
    );
  }
  GetQuestionAnswersCountRight(IdUser: number) {
    return this._HttpClient.get(
      environment.endpoint + 'MyAnswer/Get_Question_Answers_Count_Right',
      { params: { IdUser } }
    );
  }
}
