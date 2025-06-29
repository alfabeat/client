
import { Component, OnInit, WritableSignal} from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../member';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
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
@if (members(); as memberList) {
  <div>
    @for (member of memberList; track member) {
      <div>
        <h3>{{ member.Name }}</h3>
        <p>{{ member.role }}</p>
      </div>
    }
  </div>
}

<!-- Show a loader or a message if the data is not yet available -->
@if (!members().length) {
  <div>
    <p>No members available or still loading...</p>
  </div>
}
`,
})
export class MemberListComponent implements OnInit {
members = {} as WritableSignal<Member[]>;

  constructor(private membersService: MemberService) {
     this.members = this.membersService.members$;
  }

   ngOnInit() {
     this.fetchmembers();
   }
   private fetchmembers(): void {
      // Fetch members from the service
      this.membersService.getmembers();
    

  }



}
