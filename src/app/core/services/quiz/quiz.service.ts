import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private httpClient: HttpClient) {}

  answerQuestion(data: any) {
    return this.httpClient.post(
      environment.endpoint + 'Question_Answers_Log/AnsQuePost',
      data
    );
  }

  addView(formData: any) {
    return this.httpClient.post(
      environment.endpoint + 'Views/AddView',
      formData
    );
  }

  addComment(formData: any) {
    return this.httpClient.post(
      environment.endpoint + 'Comment/PutComment',
      formData
    );
  }

  deleteomment(id: number) {
    return this.httpClient.delete(environment.endpoint + 'Comment/deletecomm', {
      params: { id },
    });
  }
}
