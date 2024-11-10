// app.routes.ts
import { Routes } from '@angular/router';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { ListbookComponent } from './components/Book-management/listbook/listbook.component';


export const routes: Routes = [
  { path: '', component: DashbordAdminComponent },
  { path: 'book-list', component: ListbookComponent },

  
  
];
