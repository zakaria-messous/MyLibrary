// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Import routes from your routing file

@NgModule({
  declarations: [
    AppComponent,
    // other components
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Ensure the routes are passed to RouterModule.forRoot() correctly
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
