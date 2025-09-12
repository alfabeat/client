import { Router } from '@angular/router';
import { Component, OnInit, WritableSignal} from '@angular/core';
import { EventService } from '../event.service';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { Event } from '../event';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-event-page',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule,  NgFor, JsonPipe, MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,DatePipe],
  template: `
  <div class="event-list-scroll">
    <mat-card class="class-card" (click)="selectEvent(eventItem)" *ngFor="let eventItem of events">
      <mat-card-title>
        <p><strong>Title:</strong> {{ eventItem.title }}</p>
        <p><strong>Created By:</strong> {{ eventItem.createdBy }}</p>
      </mat-card-title>
      <mat-card-content>
        <p><strong>Description:</strong> {{ eventItem.description }}</p>
        <p><strong>Start Date:</strong> {{ eventItem.start | date:'dd/MM/yyyy' }}</p>
        <p><strong>End Date:</strong> {{ eventItem.end | date:'dd/MM/yyyy' }}</p>
      </mat-card-content>
      <hr />
    </mat-card>
  </div>
  `,
  styles: `     
    .event-list-scroll {
      max-height: 70vh;
      overflow-y: auto;
      padding-right: 8px;
     
    }
    .class-card {
      cursor: pointer;
      transition: box-shadow 0.3s ease;   
      width: 100%;
        background-color: rgba(255, 255, 255, 0.1); /* white with 70% opacity */

      box-shadow: none;
      margin-bottom: 1rem;
    }
    .class-card:hover {
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    }
    button:first-of-type {
      margin-right: 1rem;
    }
  `
})
export class EventPageComponent implements OnInit {

  events : Event[] = [];
  event : Event = {} as Event;
  constructor(private eventsService: EventService, private router: Router) {}
  ngOnInit(): void {
     this.eventsService.getData().subscribe((response) => {
      this.events  = response;
      console.log('Data fetched:', this.events );
  });}
  
  selectedevent: any = null;

  selectEvent(selevent: any) {
    this.selectedevent = selevent;
    console.log('Selected event:', this.selectedevent._id);
    this.router.navigate(['/events', this.selectedevent._id]);
  }
   
}
//   ngOnInit(): void {
//   this.fetchmembers();
// }

// members$ = {} as WritableSignal<Member[]>;

//   constructor(private membersService: MemberService) {
//      this.members$ = this.membersService.members$;
//   }

//    ngOnInit() {
//      this.fetchmembers();
//    }
  //  private fetchmembers(): void {
  //     //Fetch members from the service
  //     this.membersService.getmembers();
    

  // }

