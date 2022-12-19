import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SentencesService {
  constructor(private httpClient: HttpClient) {}

  Add(formData: any) {
    return this.httpClient.post(
      environment.endpoint + 'Sentence/SetSentence',
      formData
    );
  }

  Get(id: number) {
    return this.httpClient.get(
      environment.endpoint + 'Sentence/GetSentences?id=' + id
    );
  }

  GetAll() {
    return this.httpClient.get(
      environment.endpoint + 'Sentence/GetAllSentences'
    );
  }

  Delete(id: any) {
    return this.httpClient.delete(
      environment.endpoint + 'Sentence/DeleteSentence?id=' + id
    );
  }
}
