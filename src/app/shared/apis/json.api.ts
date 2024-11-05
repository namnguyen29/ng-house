import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ENV_CONFIG } from '@app-core/configs';
import { TodoPost } from '@app-shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JsonApi {
  private readonly env = inject(ENV_CONFIG);
  private readonly http = inject(HttpClient);

  // use response to get the whole request
  /*public getPost(id: number): Observable<HttpResponse<TodoPost>> {
    return this.http.get<TodoPost>(`${this.env.jsonApiUrl}/${id}`, { observe: 'response' });
  } */

  public getPost(id: number): Observable<TodoPost> {
    // more control
    const params = new HttpParams().set('foo', 'bar').set('hello', 'world');
    const headers = new HttpHeaders().set('My-Custom-Header', ['UwU', 'EoEo']);

    return this.http.get<TodoPost>(`${this.env.jsonApiUrl}/${id}`, { params, headers });
  }
}
