import { Injectable, signal } from '@angular/core';
import { Event } from './event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  //private url = 'https://rugbyweb.onrender.com/api';
  private url = 'http://localhost:3000/api';
  events$ = signal<Event[]>([]);
  event$ = signal<Event>({} as Event);

  constructor(private http: HttpClient) {  }

  getData():  Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/events/').pipe(
     map(response => response.result), // Adjust based on your API response structure
      );
  }
  private refreshevents() {
    this.http.get<Event[]>(`${this.url}/events/`)
      .subscribe(events => {
        this.events$.set(events);
      });
  }
  
  getevent(id: string) : Observable<Event> {

    return this.http.get<any>(`${this.url}/events/getid?id=${id}`).pipe( 
      map(response => response.result) // Adjust based on your API response structure
      )

    

  }
  getevents(){
    this.refreshevents();
    return this.events$;
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
