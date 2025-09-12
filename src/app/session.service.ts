import { Injectable, signal } from '@angular/core';
import { Member } from './member';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { login } from './login';
import { setToken } from './app.config';
import { response } from 'express';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authReq = req.clone({
//       setHeaders: {
//         'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzU1MzkxNjkwLCJleHAiOjE3NTUzOTUyOTB9.s-745KxMi2IDRf0G0ouIGM-kYSbj5Mn1zpAzsLpZ_90`
//       }
//     });
//     return next.handle(authReq);
//   }

// }
@Injectable({
  providedIn: 'root'
})
export class logged{

  
  loggedin: boolean = false;

  setloggedintrue(){
    this.loggedin = true;
  }
  setloggedinfalse(){
    this.loggedin = false;
  }
  getloggedin(){
    return this.loggedin;
  }

}
@Injectable({
  providedIn: 'root'
})
export class sessionService {
// private url = 'https://rugbyweb.onrender.com/api';

 private url = 'http://localhost:3000/api';
//   private url = 'https://rugbyweb.onrender.com/api';
  token : string = ""
  constructor(private http: HttpClient, private logged: logged) {  }
  gettoken(logindetails: login) {
  this.http.post<any>(`${this.url}/session/login`,logindetails,{responseType: 'json'})  
      .subscribe(response => {
        this.token = response.token;
        if (response.token) {
          this.logged.setloggedintrue();
        }else {
          this.logged.setloggedinfalse();
        }
        console.log('Token received:', this.token);
        console.log('Logged in status:', this.logged.getloggedin());
        setToken(this.token);
      });
  }

//  

}