
import { Component, OnInit, WritableSignal} from '@angular/core';
import { EventService } from '../event.service';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgIf, NgFor } from '@angular/common';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-event-page',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule, NgIf, NgFor, JsonPipe],
  template: `
<div *ngFor="let event of events">
  <p><strong>Name:</strong> {{ event.title }}</p>

  <hr />
</div>
  `,
  styles: `      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }`
})
export class EventPageComponent implements OnInit {
  events : any;

  constructor(private eventsService: EventService) {}
  ngOnInit(): void {
     this.eventsService.getData().subscribe((response) => {
      this.events  = response;
      console.log('Data fetched:', this.events );
  });
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
}
