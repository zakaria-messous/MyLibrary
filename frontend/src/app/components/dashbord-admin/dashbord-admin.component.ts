import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, NavComponent],  // Ajoutez NavComponent dans les imports
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.css']
})

export class DashbordAdminComponent {
  title = 'frontend';
}