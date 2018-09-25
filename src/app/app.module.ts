import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { RouterModule, Routes } from '@angular/router'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { FlickityModule } from 'ngx-flickity';
import { InternetConnection } from './Extension/internetConnection';
import { UsersService } from './services/users.service';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { PricingDetailComponent } from './components/pricing-detail/pricing-detail.component';
import { NgImageSliderModule } from 'ng-image-slider';




const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, data: {
      page: 'home'
    }
  },
  {
    path: 'eventdetail/:eventId',
    component: EventDetailComponent
  },
  {
    path: 'bookNow/:eventId',
    component: PricingDetailComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventDetailComponent,
    PricingDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlickityModule,
    HttpClientModule,
    NgImageSliderModule,
    FormsModule,

    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
    })
  ],
 
  providers: [UsersService, DatePipe, InternetConnection],
  bootstrap: [AppComponent]
})
export class AppModule { }
