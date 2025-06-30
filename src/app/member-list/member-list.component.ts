
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
.about-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
}

/* Main content: 2/3 width */
.main-content {
  flex: 2;
  min-width: 300px;
}

.about-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
}

.main-content h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.main-content p {
  color: #444;
  line-height: 1.6;
}

/* Sidebar: 1/3 width */
.sidebar {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-card {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.news-card h3 {
  margin: 0 0 5px;
  font-size: 18px;
}

.news-card p {
  margin: 0;
  font-size: 14px;
  color: #555;
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
