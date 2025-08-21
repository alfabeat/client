import { Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { EventPageComponent } from './event-page/event-page.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { FormEventComponent } from './form-event/form-event.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
    {path: 'nav', component: NavbarComponent, title: 'NavbarComponent'},
    { path: 'member', component: MemberListComponent, title: 'Member List' },
     {path: '', component: AboutComponent, title: 'About' },
     {path: 'event', component: EventPageComponent, title: 'event' },
    {path: 'events/:id', component: EventDetailComponent, title: 'eventdetail' },
    {path: 'events/:id/add', component: AddEventComponent, title: 'Add Event' },
    {path: 'events/:id/edit', component: FormEventComponent, title: 'Edit Event' },
     {path: 'members/:id', component: MemberDetailComponent, title: 'memberdetail' },
     {path: 'members/:id/add', component: AddMemberComponent, title: 'Add Member' },
     {path: 'members/:id/edit', component: MemberFormComponent, title: 'Edit Member' },
   {path: 'login', component: LoginComponent, title: 'Login' },

];
