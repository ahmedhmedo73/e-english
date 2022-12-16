import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private HttpClient: HttpClient) {}

  GetQuestionAnswersReportForUser(userId: string) {
    return this.HttpClient.get(
      environment.endpoint + 'MyAnswer/GetUserAnswersOnQuestions',
      { params: { userId } }
    );
  }
}
