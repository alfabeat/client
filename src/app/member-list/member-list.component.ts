import { Router } from '@angular/router';
import { Component, OnInit, WritableSignal} from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../member';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgIf, NgFor } from '@angular/common';
import { JsonPipe } from '@angular/common';
import e, { response } from 'express';
import { get } from 'http';


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

<mat-card class="class-card" (click)="selectmember(member)" *ngFor="let member of members">
  <mat-card-title><p><strong>Name:</strong> {{ member.Name }}</p>
  <p><strong>Email:</strong> {{ member.email }}</p></mat-card-title>
    <mat-card-content><p><strong>Role:</strong> {{ member.role }}</p>
  <p><strong>Team:</strong> {{ member.team }}</p>  </mat-card-content>
  <hr />

</mat-card>
`,
})
export class MemberListComponent implements OnInit {
    selectedmember: any = null;

  selectmember(selmember: any) {
    this.selectedmember = selmember;
    console.log('Selected member:', this.selectedmember._id);
    this.router.navigate(['/members', this.selectedmember._id]);
  }
  members : Member[] = [];
  member : Member = {} as Member;

  constructor(private membersService: MemberService, private router: Router) {}
  ngOnInit(): void {
     this.membersService.getData().subscribe((response) => {
      this.members  = response;
      console.log('Data fetched:', this.members );
  });
  }
  getid(id: string) {
    this.membersService.getMember(id).subscribe((response)=>{
   this.member = response; 
      console.log('Member fetched:', this.member);
      error: (err: any) => {
        console.error('Error fetching member:', err);
        alert('Failed to fetch member');
      }
    });
  }
  // addEvent() {
  //   // Implement add member logic here
  //   this.member.MemberId = '3'; // Example ID
  //   this.member.Name = 'New Member'; 
  //   this.member.role = 'member'; // Default role
  //   this.member.team = 'default-team'; // Default team
  //   this.member.email = "will@gmail.com"
  //   this.membersService.addMember(this.member).subscribe({
  //     next: () => {
  //       console.log('Member added successfully');
  //      // this.membersService.getmembers(); // Refresh the member list
  //     },
  //     error: (error) => {
  //       alert('Failed to create member');
  //       console.error(error);
  //     },
  //   });
  //   console.log('Add event triggered');
  // }

  // editEvent() {
  //   // Implement edit member logic here
  //   this.member.MemberId = '3'; // Example ID
  //   this.member.Name = 'Member'; 
  //   this.member.role = 'member'; // Default role
  //   this.member.team = 'default-team'; // Default team
  //   this.member.email = "will@gmail.com"
  //   this.membersService.updateMember("685f4014420f9ca53547fc60", this.member).subscribe({
  //     next: () => {
  //       console.log('Member updated successfully');
  //       // this.membersService.getmembers(); // Refresh the member list
  //     },
  //     error: (error) => {
  //       alert('Failed to update member');
  //       console.error(error);
  //     },
  //   });
  //   console.log('Edit event triggered for:', );
  // }

  // deleteEvent() {
  //   // Implement delete member logic here
  //   this.membersService.deleteMember("685f4014420f9ca53547fc60").subscribe({
  //     next: () => {
  //       console.log('Member delete successfully');
  //       // this.membersService.getmembers(); // Refresh the member list
  //     },
  //     error: (error) => {
  //       alert('Failed to delete member');
  //       console.error(error);
  //     },
  //   });
  //   console.log('Delete event triggered for:', );
  // }

  getEventId() {
    // Implement get member ID logic here
    this.getid("6861d62775e02c4a96d38690");
    console.log('Get ID event triggered for:', );
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




