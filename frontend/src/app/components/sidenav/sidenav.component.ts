import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class SidenavComponent {
  showBookOptions = false;
  showUserOptions = false;

  toggleBookManagement() {
    this.showBookOptions = !this.showBookOptions;
  }

  toggleUserManagement() {
    this.showUserOptions = !this.showUserOptions;
  }
}
