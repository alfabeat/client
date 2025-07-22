import { Component, OnInit, WritableSignal} from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../member';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule
  ],
  template: `

<mat-toolbar color="primary" class="navbar">
  <span class="app-title">MyApp</span>
    <span class="spacer"></span>
  <span class="nav-links">
    <a routerLink="/" class="nav-item" routerLinkActive="active">About</a>
    <a routerLink="/member" class="nav-item" routerLinkActive="active">Member List</a>
    <a routerLink="/event" class="nav-item" routerLinkActive="active">Event</a>
  </span>
</mat-toolbar>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 200px;
    }

    main-content {
      padding: 16px;
    }

    app-title {
      margin-left: 16px;
    }

    .navbar {
      display: flex;
      align-items: center;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .nav-links {
      display: flex;
      gap: 16px;
    }
      ,
         "src/styles.css",
  `]
})
export class NavbarComponent {
  navLinks = ['Home', 'About', 'Contact'];
}

