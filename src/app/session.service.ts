import { Injectable, signal } from '@angular/core';
import { Member } from './member';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { login } from './login';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  static getToken(): string | number | (string | number)[] {
    throw new Error('Method not implemented.');
  }
  
  constructor(private http: HttpClient) {}
 //private url = 'http://localhost:3000/api';
   private url = 'https://rugbyweb.onrender.com/api';
 headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 log : login = { username: 'admin', password: 'password' };
    login(): Observable<any> {

        return this.http.post<any>(`${this.url}/session/login`, this.log).pipe(
            map(response => {
            const token = response.token;
            if (token) {
                // Save token in headers for future requests
                this.headers = new HttpHeaders( {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                });
            }
          
            })
        );
   
    }
    getToken(): string  {
        const token = this.headers.get('x-access-token');
        return token ? token : '';
    }

 
}
