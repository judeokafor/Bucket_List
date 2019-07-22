import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'Rxjs';

import { User } from '../models/User';

const service_base = 'http://localhost:6066/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
  })
export class CrudService {
  constructor(private _http: HttpClient) {}

  post(data, url): Observable<any> {
    return this._http.post(`${service_base}${url}`, data, httpOptions);
  }

  getWithHeaders(url, token): Observable<any> {
    return this._http.get(`${service_base}${url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }

  deleteWithHeaders(url, token): Observable<any> {
    return this._http.delete(`${service_base}${url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }

  putWithHeaders(url, data, token): Observable<any> {
    return this._http.put(`${service_base}${url}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }

  postWithHeaders(url, data, token): Observable<any> {
    return this._http.post(`${service_base}${url}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
}
