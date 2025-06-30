import { Injectable, signal } from '@angular/core';
import { Event } from './event';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url = 'https://rugbyweb.onrender.com';
 // private url = 'http://localhost:3000/api';
  events$ = signal<Event[]>([]);
  event$ = signal<Event>({} as Event);

  constructor(private http: HttpClient) {  }
  
  getData():  Observable<any> {
    return this.http.get<any>('https://rugbyweb.onrender.com/api/events/').pipe(
     map(response => response.result), // Adjust based on your API response structure
      );
  }
  private refreshevents() {
    this.http.get<Event[]>(`${this.url}/events/`)
      .subscribe(events => {
        this.events$.set(events);
      });
  }

  getevents(){
    this.refreshevents();
    return this.events$;
  }

  getevent(id: string) {
    this.http.get<Event>(`${this.url}/events/getid?id=${id}`).subscribe({
      next: (event) => {
        this.event$.set(event);
        return this.event$();
      },
      error: (err) => console.error('Error fetching event:', err)
    });
  }

  addevent(event: Event) {
    return this.http.post<Event>(`${this.url}/events/`, event, { 
      responseType: 'json'});
  }
  updateevent(id: string, event: Event) {
    return this.http.put(`${this.url}/events/edit?id=${id}`, event, { 
      responseType: 'json'});
  }
  deleteevent(id: string) {
    return this.http.delete(`${this.url}/events/delete?id=${id}`, { 
      responseType: 'json'});
  }
}
