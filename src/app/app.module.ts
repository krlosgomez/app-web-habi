import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Routing
import { AppRoutingModule } from './app-routing.module';

/* Libs */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

/* Modules */
import { ApartmentsModule } from './apartments/apartments.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ApartmentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
