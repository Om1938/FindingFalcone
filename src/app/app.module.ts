import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinderComponent } from './components/finder/finder.component';
import { TravelComponent } from './components/travel/travel.component';
import { ChooseVehicleComponent } from './components/choose-vehicle/choose-vehicle.component';
import { PostInterceptor } from './post.interceptor';

import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    FinderComponent,
    TravelComponent,
    ChooseVehicleComponent,
    ResultComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PostInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
