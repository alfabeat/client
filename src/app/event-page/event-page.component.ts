import { Router } from '@angular/router';
import { Component, OnInit, WritableSignal} from '@angular/core';
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
@Component({
  selector: 'app-event-page',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule, NgIf, NgFor, JsonPipe, MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,],
  template: `
  <mat-card class="class-card" (click)="selectEvent(eventItem)" *ngFor="let eventItem of events">
  <mat-card-title>{{ eventItem.title }}</mat-card-title>
  <mat-card-content>
    disc: <br />
   
  </mat-card-content>
</mat-card>


  `,
  styles: `      table {
     
      }
        .class-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease;   
  width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
}
.class-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}`
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

