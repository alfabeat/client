import { Component ,effect,EventEmitter,inject, input, Output,} from '@angular/core';
import { EventService } from '../event.service';
import { Router, RouterModule } from '@angular/router';
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
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { create } from 'domain';
import { start } from 'repl';
import { MatRadioModule } from '@angular/material/radio';
import { logged } from '../session.service';
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
  imports: [    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,],
  template: `
  
 <form
      class="Event-form"
      autocomplete="off"
      [formGroup]="EventForm"
      (submit)="submitForm()"
    >

<p>You selected: {{ eventdata.title }}</p>
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput placeholder="Title" formControlName="title" required />
        @if (title.invalid) {
        <mat-error>Title must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Description</mat-label>
        <input matInput placeholder="Description" formControlName="description" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Created By</mat-label>
        <input matInput placeholder="Created By" formControlName="createdBy" required />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Start Date</mat-label>
        <input matInput [matDatepicker]="startPicker" formControlName="start" required />
        <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
        <mat-datepicker #startPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field>
        <mat-label>End Date</mat-label>
        <input matInput [matDatepicker]="endPicker" formControlName="end" required />
        <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
      </mat-form-field>
      <mat-radio-group formControlName="allDay" aria-label="Select an option">
        <mat-radio-button name="allDay" value="false" required 
          >Is not all day</mat-radio-button
        >
        <mat-radio-button name="allDay" value="true"
          >Is all day</mat-radio-button
        >
     
      </mat-radio-group>
      <br />

      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="EventForm.invalid"
        (click)="editEvent(eventdata._id)"
      >
        Edit
      </button>   
      <button
        mat-raised-button
        color="warn"
        type="button"
        [disabled]="EventForm.invalid"
        (click)="deleteEvent(eventdata._id)"
      >
        Delete
      </button>  
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="EventForm.invalid"
        (click)="addevent()"
      >
        Add
      </button>    
  `,
  styles: `
    .Event-form {
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
export class FormEventComponent {
 selectedDate: Date | null = null;    
 route = inject(ActivatedRoute);
 onDateChange(event: any): void {
    this.selectedDate = event.value;
    console.log('Date selected:', this.selectedDate);
  }
  events : Event[] = [];
eventdata: Event = {} as Event;


  ngOnInit(): void {
       if ( !this.logger.getloggedin()){
    this.router.navigate(['/login']);
   }
  const id = String(this.route.snapshot.paramMap.get('id'));
    this.getid(id);
  }
  getid(id: string) {
    this.eventsService.getevent(id).subscribe((response)=>{
  // this.eventdata = response;
   this.eventdata = Array.isArray(response) ? response[0] : response;
      console.log('event fetched:', this.eventdata._id);
      error: (err: any) => {
        console.error('Error fetching member:', err);
        alert('Failed to fetch member');
      }
    });
  }
  
 addevent() {
    this.eventdata.title = this.title.value;
    this.eventdata.title = this.title.value;
    this.eventdata.description = this.description.value;
    this.eventdata.allDay = this.allDay.value;
    this.eventdata.start = this.start.value;
    this.eventdata.end = this.end.value;
    this.eventsService.addevent( this.eventdata).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create member');
        console.error(error);
      },
    });
 
  }

  editEvent(id: string |number| undefined) {
       if (typeof id === 'number') {
      id = id.toString();
      console.log('Converted id to string:', id);
    }
    // Implement edit events logic here
    this.eventdata.title = this.title.value;
    this.eventdata.title = this.title.value;
    this.eventdata.description = this.description.value;
    this.eventdata.allDay = this.allDay.value;
    this.eventdata.start = this.start.value;
    this.eventdata.end = this.end.value;

    if (typeof id === 'string') {
      this.eventsService.updateevent(id, this.eventdata).subscribe({
        next: () => {
          console.log('event updated successfully');
          // this.membersService.getmembers(); // Refresh the member list
          
        },
        error: (error) => {
          alert('Failed to update event');
          console.error(error);
        },
      });
      console.log('Edit event triggered for:', id);
    } else {
      alert('Invalid member ID');
      console.error('Edit event triggered with invalid ID:', id);
    }
  }


  deleteEvent(id: string|number | undefined) {
    // Implement delete member logic here
       if (typeof id === 'number') {
      id = id.toString();
    }
      if (typeof id === 'string') {
    this.eventsService.deleteevent(id).subscribe({
      next: () => {
        console.log('event delete successfully');
        // this.membersService.getmembers(); // Refresh the member list
      },
      error: (error) => {
        alert('Failed to delete member');
        console.error(error);
      },
    });
    console.log('Delete event triggered for:', );
  }
  }

  getEventId() {
    // Implement get member ID logic here
    this.getid("id");
    console.log('Get ID event triggered for:', );
  }
 initialState = input<Event>();

  @Output()
  formValuesChanged = new EventEmitter<Event>();

  @Output()
  formSubmitted = new EventEmitter<Event>();

   EventForm: any;

  constructor(private formBuilder: FormBuilder,private logger: logged, private eventsService: EventService,private router: Router) {
    this.EventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      createdBy: ['', [Validators.required]], 
      start: [new Date(), [Validators.required]],
      end: [new Date(), [Validators.required]],
      allDay: [false, [Validators.required]],
    });

    effect(() => {
      this.EventForm.setValue({
        title: this.initialState()?.title || '',
        allDay: this.initialState()?.allDay || false,
        description: this.initialState()?.description || '',
        createdBy: this.initialState()?.createdBy || '',
        start: this.initialState()?.start || new Date(),
        end: this.initialState()?.end || new Date(),

      });
    });
  }

  get title() {
    return this.EventForm.get('title')!;
  }
  get description() {
    return this.EventForm.get('description')!;
  }
  get allDay() {
    return this.EventForm.get('allDay')!;
  }
  get start() {
    return this.EventForm.get('start')!;
  }
  get end() {
    return this.EventForm.get('end')!;
  }
  get createdBy() {
    return this.EventForm.get('createdBy')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.EventForm.value as Event);
  }
}
