import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NavbarComponent } from './navbar/navbar.component';  
import { MatToolbarModule } from '@angular/material/toolbar';
 //<app-members-list></app-members-list>
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MemberListComponent, RouterOutlet, NavbarComponent, ContactusComponent],
 
  template: `

      <header>
      <app-navbar></app-navbar>
      </header>
    
  
    <main>
   <router-outlet></router-outlet>
    </main>
    <footer class="bg-dark text-white text-center py-3">
      
      <app-contactus></app-contactus>
    </footer>
  `,
  styles: [`
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;,
         "src/styles.css"
      }
    `,],
})
export class AppComponent {
  title = 'client';
}
