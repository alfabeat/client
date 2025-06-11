import { Injectable, signal } from '@angular/core';
import { Member } from './member';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private url = 'http://localhost:3000';
  members$ = signal<Member[]>([]);
  member$ = signal<Member>({} as Member);

  constructor(private http: HttpClient) {
;
  }
  getMembers() {
    this.http.get<Member[]>(`${this.url}/members`).subscribe({
      next: (members) => this.members$.set(members),
      error: (err) => console.error('Error fetching members:', err)
    });
  }
  getmember(){
    this.getMembers();
    return this.members$;
  }

  getMember(id: string) {
    this.http.get<Member>(`${this.url}/members/${id}`).subscribe({
      next: (member) => this.member$.set(member),
      error: (err) => console.error('Error fetching member:', err)
    });
  }

}
