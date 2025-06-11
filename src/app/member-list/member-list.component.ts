
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
    <mat-card>
      <mat-card-header>
        <mat-card-title>members List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="members$()">
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.Name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-role">
            <th mat-header-cell *matHeaderCellDef>role</th>
            <td mat-cell *matCellDef="let element">{{ element.role }}</td>
          </ng-container>
          <ng-container matColumnDef="col-email">
            <th mat-header-cell *matHeaderCellDef>email</th>
            <td mat-cell *matCellDef="let element">{{ element.email }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
           
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>

    </mat-card>
  `,
})
export class MemberListComponent {
members$ = {} as WritableSignal<Member[]>;
  displayedColumns: string[] = [
    'col-name',
    'col-role',
    'col-email',
    'col-action',
  ];

  constructor(private membersService: MemberService) {}

  ngOnInit() {
    this.fetchmembers();
  }

  private fetchmembers(): void {
    this.members$ = this.membersService.members$;
    this.membersService.getMembers();
  }
}
