
import { Component, OnInit, WritableSignal} from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../member';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgIf, NgFor } from '@angular/common';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule, NgIf, NgFor, JsonPipe],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
<div *ngFor="let member of members">
  <p><strong>Name:</strong> {{ member.Name }}</p>
  <p><strong>Email:</strong> {{ member.email }}</p>
  <p><strong>Role:</strong> {{ member.role }}</p>
  <p><strong>Team:</strong> {{ member.team }}</p>
  <hr />
</div>
`,
})
export class MemberListComponent implements OnInit {
  members : any;

  constructor(private membersService: MemberService) {}
  ngOnInit(): void {
     this.membersService.getData().subscribe((response) => {
      this.members  = response;
      console.log('Data fetched:', this.members );
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
