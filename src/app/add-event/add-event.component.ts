import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormEventComponent } from '../form-event/form-event.component';
import e from 'express';

@Component({
  selector: 'app-add-event',
  imports: [MatCardModule, FormEventComponent],
  template: `
<mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Event</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-form-event
         
        ></app-form-event>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``
})
export class AddEventComponent {

}
