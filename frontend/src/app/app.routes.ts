// app.routes.ts
import { Routes } from '@angular/router';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListbookComponent } from './components/Book-management/listbook/listbook.component';
import { HomeComponent } from './components/home/home.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
export const routes: Routes = [
  { path: 'app-dashbord-admin', component: DashbordAdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book-list', component: ListbookComponent },
  { path: 'app-user-list', component: UserListComponent },
  { path: 'admin-list', component: AdminListComponent },
  { path: '', component: HomeComponent },
];
