import { Component ,inject,} from '@angular/core';
import { EventService } from '../event.service';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgIf, NgFor } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { Event } from '../event';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router'
//     <mat-form-field appearance="fill">
//   <mat-label>Select a date</mat-label>
//   <input
//     matInput
//     [matDatepicker]="picker"
//     (dateChange)="onDateChange($event)"
//   />
//   <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
//   <mat-datepicker #picker></mat-datepicker>
  


// </mat-form-field>
@Component({
  selector: 'app-form-event',
  imports: [RouterModule, MatTableModule, MatButtonModule,   NgIf, NgFor,  MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule],
  template: `
    <p>
You selected: {{ eventdata.title }}<br />
  <button mat-raised-button color="primary" (click)="addEvent()">Add</button>
  <button mat-raised-button color="accent" (click)="editEvent()">Edit</button>
  <button mat-raised-button color="warn" (click)="deleteEvent()">Delete</button>
  <button mat-raised-button (click)="getEventId()">Get ID</button>
    </p>
  `,
  styles: ``
})
export class FormEventComponent {
 selectedDate: Date | null = null;    
 route = inject(ActivatedRoute);
 onDateChange(event: any): void {
    this.selectedDate = event.value;
    console.log('Date selected:', this.selectedDate);
  }
  events : Event[] = [];
eventdata: Event = {} as Event;
 constructor(private eventsService: EventService) {}

  ngOnInit(): void {
  const id = String(this.route.snapshot.paramMap.get('id'));
    this.getid(id);
  }
  getid(id: string) {
    this.eventsService.getevent(id).subscribe((response)=>{
   this.eventdata = response;
      console.log('event fetched:', this.eventdata._id);
      error: (err: any) => {
        console.error('Error fetching member:', err);
        alert('Failed to fetch member');
      }
    });
  }

  addEvent() {
    // Implement add member logic here
    this.eventdata = {
      title: 'New Event',
      start: new Date(),
      end: new Date(),
      allDay: false,
      createdBy: 'admin',
      description: 'This is a new event'
    };
    this.eventsService.addevent(this.eventdata).subscribe({
      next: () => {
        console.log('Member added successfully');
       // this.membersService.getmembers(); // Refresh the member list
      },
      error: (error) => {
        alert('Failed to create member');
        console.error(error);
      },
    });
    console.log('Add event triggered');
  }

  editEvent() {
    // Implement edit member logic here
      this.eventdata = {
      title: 'Event',
      start: new Date(),
      end: new Date(),
      allDay: false,
      createdBy: 'admin',
      description: 'This is a new event'
    };
    this.eventsService.updateevent("687aeb92037d60988b558d28", this.eventdata).subscribe({
      next: () => {
        console.log('event updated successfully');
        // this.membersService.getmembers(); // Refresh the member list
      },
      error: (error) => {
        alert('Failed to update event');
        console.error(error);
      },
    });
    console.log('Edit event triggered for:', );
  }

  deleteEvent() {
    // Implement delete member logic here
    this.eventsService.deleteevent("687aeb92037d60988b558d28").subscribe({
      next: () => {
        console.log('Member delete successfully');
        // this.membersService.getmembers(); // Refresh the member list
      },
      error: (error) => {
        alert('Failed to delete member');
        console.error(error);
      },
    });
    console.log('Delete event triggered for:', );
  }

  getEventId() {
    // Implement get member ID logic here
    this.getid("687aeb92037d60988b558d28");
    console.log('Get ID event triggered for:', );
  }

}
