import { Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { NavbarComponent } from './navbar/navbar.component';


export const routes: Routes = [
    {path: 'nav', component: NavbarComponent, title: 'NavbarComponent'},
    { path: '', component: MemberListComponent, title: 'Member List' }
];
