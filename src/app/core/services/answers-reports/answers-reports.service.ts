import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnswersReportsService {
  constructor(private HttpClient: HttpClient) {}

  GetQuestionAnswersReportForUser(userId: string) {
    return this.HttpClient.get(
      environment.endpoint + 'MyAnswer/GetUserAnswersOnQuestions',
      { params: { userId } }
    );
  }

  GetQuestionAnswersReport() {
    return this.HttpClient.get(
      environment.endpoint + 'Question/GetQuestionsDetails'
    );
  }

  GetSentenceAnswersReportForUser(userId: string) {
    return this.HttpClient.get(
      environment.endpoint + 'MyAnswer/GetUserAnswersOnSentences',
      { params: { userId } }
    );
  }

  GetGeneralReport() {
    return this.HttpClient.get(
      environment.endpoint + 'Reports/GetReportSummary'
    );
  }
}
