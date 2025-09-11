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
import { logged } from '../session.service';
// <mat-label>Select a date</mat-label>
//   <input
//     matInput
//     [matDatepicker]="picker"
//     [(ngModel)]="selectedDate"
//     name="dateInput"
//   />
//   <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
//   <mat-datepicker #picker></mat-datepicker>
 
@Component({//todo: add renewal  viewing merchandise page
  

  //display event on about
  selector: 'app-member-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  template: `
 <form
      class="member-form"
      autocomplete="off"
      [formGroup]="memberForm"
      (submit)="submitForm()"
    >



<p>You selected: {{ member.Name }}</p>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="Name" required />
        @if (Name.invalid) {
        <mat-error>Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>
  
      <mat-form-field>
        <mat-label>email</mat-label>
        <input
          matInput
          placeholder="email"
          formControlName="email"
          required
        />
        @if (email.invalid) {
        <mat-error>email must be at least 5 characters long.</mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label>team</mat-label>
        <input
          matInput
          placeholder="team"
          formControlName="team"
          required
        />
        @if (team.invalid) {
        <mat-error>team must be at least 5 characters long.</mat-error>
        }
      </mat-form-field>
      <mat-radio-group formControlName="role" aria-label="Select an option">
        <mat-radio-button name="role" value="member" required 
          >member</mat-radio-button
        >
        <mat-radio-button name="role" value="senior"
          >senior</mat-radio-button
        >
     
      </mat-radio-group>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="memberForm.invalid"
        (click)="editEvent(member._id)"
      >
        Edit
      </button>   
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="memberForm.invalid"
        (click)="deleteEvent(member._id)"
      >
        Delete
      </button>   
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="memberForm.invalid"
        (click)="addmember()"
      >
        Add
      </button>  
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
export class MemberFormComponent {
  
 route = inject(ActivatedRoute);

  members : Member[] = [];
  member : Member = {} as Member;

  ngOnInit(): void {
   if ( !this.logger.getloggedin()){
    console.log('User not logged in, redirecting to login page',this.logger.getloggedin());
    this.router.navigate(['/login']);
   }
  const id = String(this.route.snapshot.paramMap.get('id'));
   
      this.membersService.getMember(id).subscribe((response) => {
      this.member  = response;
      console.log('Data fetched:', this.member );
  });
  }
  getid(id: string) {
    this.membersService.getMember(id).subscribe((response)=>{
  // this.member = response; 
   this.member = Array.isArray(response) ? response[0] : response;
      console.log('Member fetched:', this.member);
      error: (err: any) => {
        console.error('Error fetching member:', err);
        alert('Failed to fetch member');
      }
    });
  }


  editEvent(id: string | number | undefined) {
    // Implement edit member logic here
    if (typeof id === 'number') {
      id = id.toString();
    }
    this.member.Name = this.Name.value;
    this.member.role = this.role.value; // Default role
    this.member.team = this.team.value; // Default team
    this.member.email = this.email.value;
    
    if (typeof id === 'string') {
      this.membersService.updateMember(id, this.member).subscribe({
        next: () => {
          console.log('Member updated successfully');
          // this.membersService.getmembers(); // Refresh the member list
        },
        error: (error) => {
          alert('Failed to update member');

          console.error(error);
        },
      });
      console.log('Edit event triggered for:', id);
    } else {
      alert('Invalid member ID');
      console.error('Edit event triggered with invalid ID:', id);
    }
  }

 addmember() {
     this.member.Name = this.Name.value;
    this.member.role = this.role.value; // Default role
    this.member.team = this.team.value; // Default team
    this.member.email = this.email.value;
    this.membersService.addMember( this.member).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create member');
        console.error(error);
      },
    });
 
  }
  deleteEvent(id: string | number | undefined) {
    // Implement delete member logic here
        if (typeof id === 'number') {
      id = id.toString();
    }
      if (typeof id === 'string') {
    this.membersService.deleteMember(id).subscribe({
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
  }

  getEventId() {
    // Implement get member ID logic here
    this.getid("id");
    console.log('Get ID event triggered for:', );
  }
 initialState = input<Member>();

  @Output()
  formValuesChanged = new EventEmitter<Member>();

  @Output()
  formSubmitted = new EventEmitter<Member>();

  memberForm: any;

  constructor(private formBuilder: FormBuilder,private logger: logged,   private membersService: MemberService,private router: Router) {
    this.memberForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      role: ['member', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      team: ['', [Validators.required, Validators.minLength(5)]],
    });

    effect(() => {
      this.memberForm.setValue({
        Name: this.initialState()?.Name || '',
        role: this.initialState()?.role || 'member',
        email: this.initialState()?.email || '',
        team: this.initialState()?.team || '',
      });
    });
  }

  get Name() {
    return this.memberForm.get('Name')!;
  }
  get role() {
    return this.memberForm.get('role')!;
  }
  get email() {
    return this.memberForm.get('email')!;
  }
    get team() {
    return this.memberForm.get('team')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.memberForm.value as Member);
  }
}
