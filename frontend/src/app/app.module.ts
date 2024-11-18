// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Import routes from your routing file
import { TableModule } from 'primeng/table';
import { ImportsModule } from '../imports';
import { ProductService } from './services/productService';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    // other components
  ],
  imports: [
    BrowserModule,
    ImportsModule,
    MatDialogModule,
    RouterModule.forRoot(routes) // Ensure the routes are passed to RouterModule.forRoot() correctly
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {}
