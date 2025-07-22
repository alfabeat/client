import { Injectable, signal } from '@angular/core';
import { Member } from './member';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})

export class MemberService {
 private url = 'https://rugbyweb.onrender.com/api';
// private url = 'http://localhost:3000/api';
  members$ = signal<Member[]>([]);
  member$ = signal<Member>({} as Member);

  constructor(private http: HttpClient, private sessionservice :SessionService) {  }

  getData():  Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/members/').pipe(
     map(response => response.result), // Adjust based on your API response structure
      );
  }
  
  getMember(id: string) : Observable<Member> {
    return this.http.get<any>(`${this.url}/members/getid?id=${id}`,).pipe(
      map(response => response.result)

    )

  }
  addMember(member: Member) {
  var headers = new HttpHeaders({
    'X-Session-Token': this.sessionservice.getToken()
  });
    return this.http.post<Member>(`${this.url}/members/`, member, { 
      headers: headers,
      responseType: 'json'
    });
  }

  private refreshmembers() {
    this.http.get<Member[]>(`${this.url}/members/`)
      .subscribe(members => {
        this.members$.set(members);
      });
  }
  
  getmembers(){
    this.refreshmembers();
    return this.members$;
  }




  updateMember(id: string, member: Member) {
    var headers = new HttpHeaders({
    'X-Session-Token': this.sessionservice.getToken()
  });
    return this.http.put(`${this.url}/members/edit?id=${id}`, member, {       headers: headers,
      responseType: 'json'});
  }
  deleteMember(id: string) {
    var headers = new HttpHeaders({
    'X-Session-Token': this.sessionservice.getToken()
  });
    return this.http.delete(`${this.url}/members/delete?id=${id}`, {       headers: headers,
      responseType: 'json'});
  }
}
