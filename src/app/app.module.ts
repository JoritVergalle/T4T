import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TalksComponent } from './talks/talks.component';
import { TalksAddComponent } from './talks-add/talks-add.component';
import { TrackComponent } from './track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    TalksComponent,
    TalksAddComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
