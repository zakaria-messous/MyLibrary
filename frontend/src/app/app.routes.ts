// app.routes.ts
import { Routes } from '@angular/router';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
export const routes: Routes = [
  { path: 'app-dashbord-admin', component: DashbordAdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
