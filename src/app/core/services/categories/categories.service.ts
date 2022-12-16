import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  GetCategories() {
    return this.httpClient.get(environment.endpoint + 'Categories/GetAll');
  }

  CreateCategory(data: any) {
    return this.httpClient.post(
      environment.endpoint + 'Categories/Create',
      data
    );
  }

  DeleteCategories(id: number) {
    return this.httpClient.delete(environment.endpoint + 'Categories/Delete', {
      params: { id },
    });
  }

  UpdateCategory(data: any) {
    return this.httpClient.put(
      environment.endpoint + 'Categories/Update',
      data
    );
  }

  get(id: string) {
    return this.httpClient.get(environment.endpoint + 'Categories/Get', {
      params: { id },
    });
  }
}
