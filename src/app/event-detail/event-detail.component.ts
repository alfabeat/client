import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  imports: [DatePipe],
  template: `
    <div class="event-details">
      <h2>Event Details</h2>
      <p><strong>Title:</strong> {{ event.title }}</p>
      <p><strong>Description:</strong> {{ event.description }}</p>
      <p><strong>Created By:</strong> {{ event.createdBy }}</p>

      <p><strong>All Day:</strong> {{ event.allDay ? 'Yes' : 'No' }}</p>
      <p><strong>Start Date:</strong> {{ event.start | date:'dd/MM/yyyy' }}</p>
      <p><strong>End Date:</strong> {{ event.end | date:'dd/MM/yyyy' }}</p>
      <hr />
      <button mat-raised-button color="primary" (click)="gotoaddEvent(event._id)">Add</button>
      <button mat-raised-button color="accent" (click)="gotoeditEvent(event._id)">Edit</button>
     
    </div>
  `,
  styles: `  .member-details {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    mat-mdc-form-field {
      width: 100%;
    }`
})
export class EventDetailComponent {
  events : Event[] = [];
  event : Event = {} as Event;
  constructor(   private eventsService: EventService,  private router: Router) {}
 route = inject(ActivatedRoute);
  ngOnInit(): void {
  const id = String(this.route.snapshot.paramMap.get('id'));
     this.eventsService.getevent(id).subscribe({
    next: (response) => {
      this.event = Array.isArray(response) ? response[0] : response; // Direct assignment
      console.log('event fetched:', this.event._id);
    },
    error: (err) => {
      console.error('Error fetching event:', err);
      alert('Failed to fetch event');
    }
  });
  //     this.eventsService.getevent(id).subscribe((response) => {
  //     this.event  = response;
  //     console.log('Data fetched:', this.event );
  // });
  }

  gotoaddEvent(id: string |number| undefined) {
       if (typeof id === 'number') {
      id = id.toString();
    }
    // Navigate to add member page
    if (typeof id === 'string') {
    this.router.navigate(['/events', id, 'add']);
    } else {
      console.error('Invalid event ID:', id);
    }

    console.log('Add event triggered for:', id);
    
  }
  gotoeditEvent(id: string |number| undefined) {
    // Navigate to edit event page
       if (typeof id === 'number') {
      id = id.toString();
    }
    if (typeof id === 'string') {
      this.router.navigate(['/events', id, 'edit']);
    } else {
      console.error('Invalid event ID:', id);
    }

    console.log('Edit event triggered for:', id);
  }

}
