import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../event';

@Component({
  selector: 'app-event-detail',
  imports: [],
  template: `
    <div class="event-details">
      <h2>Event Details</h2>
      <p><strong>Title:</strong> {{ event.title }}</p>
      <p><strong>Description:</strong> {{ event.description }}</p>
      <p><strong>Created By:</strong> {{ event.createdBy }}</p>

      <p><strong>All Day:</strong> {{ event.allDay ? 'Yes' : 'No' }}</p>

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

  event : Event = {} as Event;
  constructor(private formBuilder: FormBuilder, private eventsService: EventService,  private router: Router) {}
 route = inject(ActivatedRoute);
  ngOnInit(): void {
  const id = String(this.route.snapshot.paramMap.get('id'));
   
      this.eventsService.getevent(id).subscribe((response) => {
      this.event  = response;
      console.log('Data fetched:', this.event );
  });
  }
  getid(id: string) {
    this.eventsService.getevent(id).subscribe((response)=>{
   this.event = response; 
      console.log('event fetched:', this.event);
      error: (err: any) => {
        console.error('Error fetching event:', err);
        alert('Failed to fetch event');
      }
    });
  }
  gotoaddEvent(id: string | undefined) {
    
    // Navigate to add member page
    if (typeof id === 'string') {
    this.router.navigate(['/events', id, 'add']);
    } else {
      console.error('Invalid event ID:', id);
    }

    console.log('Add event triggered for:', id);
    
  }
  gotoeditEvent(id: string | undefined) {
    // Navigate to edit event page
    if (typeof id === 'string') {
      this.router.navigate(['/events', id, 'edit']);
    } else {
      console.error('Invalid event ID:', id);
    }

    console.log('Edit event triggered for:', id);
  }

}
