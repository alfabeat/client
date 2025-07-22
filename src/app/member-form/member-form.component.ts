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
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';  
// <mat-label>Select a date</mat-label>
//   <input
//     matInput
//     [matDatepicker]="picker"
//     [(ngModel)]="selectedDate"
//     name="dateInput"
//   />
//   <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
//   <mat-datepicker #picker></mat-datepicker>
// </mat-form-field>
@Component({
  selector: 'app-member-form',
  imports: [  ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule, MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, FormsModule,],
  template: `
 <form
      class="member-form"
      autocomplete="off"
      [formGroup]="memberForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="Name" required />
        @if (Name.invalid) {
        <mat-error>Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>
  


<p>You selected: {{ member.Name }}</p>
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
      >
        Add
      </button>
    </form>
  `,
  styles: `    member-form {
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
export class MemberFormComponent {
  selectedDate: Date | null = null;    
 route = inject(ActivatedRoute);
 onDateChange(event: any): void {
    this.selectedDate = event.value;
    console.log('Date selected:', this.selectedDate);
  }
  members : Member[] = [];
  member : Member = {} as Member;


  ngOnInit(): void {
  const id = String(this.route.snapshot.paramMap.get('id'));
    this.getid(id);
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
  addEvent() {
    // Implement add member logic here
    this.member.MemberId = '3'; // Example ID
    this.member.Name = 'New Member'; 
    this.member.role = 'member'; // Default role
    this.member.team = 'default-team'; // Default team
    this.member.email = "will@gmail.com"
    this.membersService.addMember(this.member).subscribe({
      next: () => {
        console.log('Member added successfully');
       // this.membersService.getmembers(); // Refresh the member list
      },
      error: (error) => {
        alert('Failed to create member');
        console.error(error);
      },
    });
    console.log('Add event triggered');
  }

  editEvent() {
    // Implement edit member logic here
    this.member.MemberId = '3'; // Example ID
    this.member.Name = 'Member'; 
    this.member.role = 'member'; // Default role
    this.member.team = 'default-team'; // Default team
    this.member.email = "will@gmail.com"
    this.membersService.updateMember("685f4014420f9ca53547fc60", this.member).subscribe({
      next: () => {
        console.log('Member updated successfully');
        // this.membersService.getmembers(); // Refresh the member list
      },
      error: (error) => {
        alert('Failed to update member');
        console.error(error);
      },
    });
    console.log('Edit event triggered for:', );
  }

  deleteEvent() {
    // Implement delete member logic here
    this.membersService.deleteMember("685f4014420f9ca53547fc60").subscribe({
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

  getEventId() {
    // Implement get member ID logic here
    this.getid("685f4014420f9ca53547fc60");
    console.log('Get ID event triggered for:', );
  }
 initialState = input<Member>();

  @Output()
  formValuesChanged = new EventEmitter<Member>();

  @Output()
  formSubmitted = new EventEmitter<Member>();

  memberForm: any;

  constructor(private formBuilder: FormBuilder, private eventsService: MemberService, private membersService: MemberService) {
    this.memberForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      role: ['member', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(5)]],
    });

    effect(() => {
      this.memberForm.setValue({
        Name: this.initialState()?.Name || '',
        role: this.initialState()?.role || 'member',
        email: this.initialState()?.email || '',
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

  submitForm() {
    this.formSubmitted.emit(this.memberForm.value as Member);
  }
}
