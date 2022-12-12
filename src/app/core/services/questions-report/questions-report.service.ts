import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionAnswersService {
  constructor(private HttpClient: HttpClient) {}

  GetQuestions() {
    return this.HttpClient.get(
      environment.endpoint + 'Question/GetAllQuestions'
    );
  }

  GetQuestionAnswersForUser(IdUser: string) {
    return this.HttpClient.get(
      environment.endpoint + 'MyAnswer/Get_Question_Answers',
      { params: { IdUser } }
    );
  }
}
