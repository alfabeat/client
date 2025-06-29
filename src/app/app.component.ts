import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { NavbarComponent } from './navbar/navbar.component';  
import { MatToolbarModule } from '@angular/material/toolbar';
 //<app-members-list></app-members-list>
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MemberListComponent, RouterOutlet, NavbarComponent],
 
  template: `

      <header>
      <app-navbar></app-navbar>
      </header>
    
  
    <main>
   <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,],
})
export class AppComponent {
  title = 'client';
}
