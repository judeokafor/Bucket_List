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
export class AuthService {
  constructor(private _http: HttpClient) {}
}
