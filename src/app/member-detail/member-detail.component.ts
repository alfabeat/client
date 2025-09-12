import { Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Member } from '../member';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../member.service';  
import { logged } from '../session.service'; // Assuming gtoken is a function that retrieves the token
import e from 'express';
@Component({
  selector: 'app-member-detail',
  imports: [    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,],
  template: `
    <div class="member-details">
      <h2>Member Details</h2>
      <p><strong>Name:</strong> {{ member.Name }}</p>
      <p><strong>Email:</strong> {{ member.email }}</p>
      <p><strong>Role:</strong> {{ member.role }}</p>
      <p><strong>Team:</strong> {{ member.team }}</p>
      <hr />
      <button mat-raised-button color="primary" (click)="gotoaddEvent(member._id)">Add</button>
      <button mat-raised-button color="accent" (click)="gotoeditEvent(member._id)">Edit</button>

    </div>
  `,
  styles: `    
  .member-details {
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
    }
  `
})
export class MemberDetailComponent {
  selectedDate: Date | null = null;    
 route = inject(ActivatedRoute);
 onDateChange(event: any): void {
    this.selectedDate = event.value;
    console.log('Date selected:', this.selectedDate);
  }
  members : Member[] = [];
  member : Member = {} as Member;
  
  constructor(private formBuilder: FormBuilder,  private membersService: MemberService, private router: Router) {}

  ngOnInit(): void {
  const id = String(this.route.snapshot.paramMap.get('id'));
    this.membersService.getMember(id).subscribe({
    next: (response) => {
      this.member = Array.isArray(response) ? response[0] : response; // Direct assignment
      console.log('me fetched:', this.member._id);
    },
    error: (err) => {
      console.error('Error fetching me:', err);
      alert('Failed to fetch member');
    }
  });
  //     this.membersService.getMember(id).subscribe((response) => {
  //     this.member  = response;
  //     console.log('me fetched:', this.member );
  // });
  }

  gotoaddEvent(id: number | string | undefined) {
    // Navigate to add member page
   if (typeof id === 'number') {
      id = id.toString();
    }
    if (typeof id === 'string') {
    this.router.navigate(['/members', id, 'add']);
    } else {
      console.error('Invalid member ID:', id);
    }

    console.log('Add event triggered for:', id);
  
  }
  gotoeditEvent(id: string |number| undefined) {
    // Navigate to edit member page
       if (typeof id === 'number') {
      id = id.toString();
    }
    if (typeof id === 'string') {
      this.router.navigate(['/members', id, 'edit']);
    } else {
      console.error('Invalid member ID:', id);
    }

    console.log('Edit event triggered for:', id);
   
  }

 initialState = input<Member>();
}
