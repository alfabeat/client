import { Injectable, signal } from '@angular/core';
import { Member } from './member';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MemberService {
 private url = 'https://rugbyweb.onrender.com/api';
// private url = 'http://localhost:3000/api';
  members$ = signal<Member[]>([]);
  member$ = signal<Member>({} as Member);

  constructor(private http: HttpClient) {  }

  getData():  Observable<any> {
    return this.http.get<any>('https://rugbyweb.onrender.com/api/members/').pipe(
     map(response => response.result), // Adjust based on your API response structure
      );
  }
  
  getMember(id: string) : Observable<Member> {
    return this.http.get<any>(`${this.url}/members/getid?id=${id}`,).pipe(
      map(response => response.result)

    )

  }
  addMember(member: Member) {

    return this.http.post<Member>(`${this.url}/members/`, member, { 
   
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
 
  console.log('Updating member with ID:',);
    return this.http.put(`${this.url}/members/edit?id=${id}`, member, {      
      responseType: 'json'});
  }
  deleteMember(id: string) {
   
    return this.http.delete(`${this.url}/members/delete?id=${id}`, {       
      responseType: 'json'});
  }
}
