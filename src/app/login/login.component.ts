import { Component, effect, EventEmitter, Output } from '@angular/core';
import { login } from '../login';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { sessionService } from '../session.service';
import { logged } from '../session.service';  
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [  ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

    MatButtonModule,

    MatNativeDateModule,
    FormsModule,],
  template: `
   <form
      class="login-form"
      autocomplete="off"
      [formGroup]="loginForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>username</mat-label>
        <input matInput placeholder="username" formControlName="username" required />
        @if (username.invalid) {
        <mat-error>Username must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>
  
      <mat-form-field>
        <mat-label>Password</mat-label>
      
 <input matInput placeholder="password" formControlName="password" required />
        

        @if (password.invalid) {
        <mat-error>Password must be at least 5 characters long.</mat-error>
        }
      </mat-form-field>
     
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="loginForm.invalid"
        (click)="loginenter()"
      >
        login
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
export class LoginComponent {
    ngOnInit(): void {}
  
logindetails: login = {} as login;
// ...
  loginenter(){

    // Implement edit events logic here
    this.logindetails.username = this.username.value;
    this.logindetails.password = this.password.value;
    console.log('Login details:', this.logindetails);


      this.session.gettoken(this.logindetails)
      // Handle token storage here if needed
      // After successful login, go back to previous page
      
     timer(100).subscribe(() => {
      timer(500).subscribe(() => {
      if (this.logger.getloggedin() == true) {
        console.log('Login successful');
        this.location.back();
      }else{
        alert('Login failed, please try again.');
      }
      
    });  
    });
     
  
  

  }

  @Output()
  formValuesChanged = new EventEmitter<login>();

  @Output()
  formSubmitted = new EventEmitter<login>();

  loginForm: any;

  constructor(private formBuilder: FormBuilder, private session: sessionService,private logger: logged,private location: Location) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      hidePassword: ['']
    });

    effect(() => {
      this.formValuesChanged.emit(this.loginForm.value as login);
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }
    get password() {
    return this.loginForm.get('password')!;
  }
  get hidePassword() {
    return this.loginForm.get('hidePassword')!;
  }




  submitForm() {
    this.formSubmitted.emit(this.loginForm.value as login);
  }
}
