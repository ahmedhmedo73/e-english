import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private httpClient: HttpClient) {}

  Get(id: number) {
    return this.httpClient.get(environment.endpoint + 'Question/GetQuestions', {
      params: { id },
    });
  }

  GetAll() {
    return this.httpClient.get(
      environment.endpoint + 'Question/GetAllQuestions'
    );
  }

  Add(data: any) {
    return this.httpClient.post(
      environment.endpoint + 'Question/SetQuestion',
      data
    );
  }

  Delete(id: any) {
    return this.httpClient.delete(
      environment.endpoint + 'Question/deleteQuestion?id=' + id
    );
  }
}
