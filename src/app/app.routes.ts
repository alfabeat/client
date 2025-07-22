import { Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { EventPageComponent } from './event-page/event-page.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { FormEventComponent } from './form-event/form-event.component';

export const routes: Routes = [
    {path: 'nav', component: NavbarComponent, title: 'NavbarComponent'},
    { path: 'member', component: MemberListComponent, title: 'Member List' },
     {path: '', component: AboutComponent, title: 'About' },
     {path: 'event', component: EventPageComponent, title: 'event' },
    {path: 'events/:id', component: FormEventComponent, title: 'eventdetail' },
     {path: 'members/:id', component: MemberFormComponent, title: 'memberdetail' },
];
