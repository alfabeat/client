import { Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { EventPageComponent } from './event-page/event-page.component';


export const routes: Routes = [
    {path: 'nav', component: NavbarComponent, title: 'NavbarComponent'},
    { path: 'member', component: MemberListComponent, title: 'Member List' },
    {path: '', component: AboutComponent, title: 'About' },
    {path: 'event', component: EventPageComponent, title: 'event' },
];
