import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberFormComponent } from '../member-form/member-form.component';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-member',
  imports: [MemberFormComponent, MatCardModule],
  template: `
<mat-card>
      <mat-card-header>
        <mat-card-title>Add a New member</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-member-form
          (formSubmitted)="addmember($event)"
        ></app-member-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``
})
export class AddMemberComponent {
  constructor(
    private router: Router,
    private memberService: MemberService
  ) {}

  addmember(member: Member) {
    this.memberService.addMember(member).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create member');
        console.error(error);
      },
    });
    this.memberService.getmembers();
  }

}
