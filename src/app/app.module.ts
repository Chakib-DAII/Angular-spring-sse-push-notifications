import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceiveEventsComponent } from './components/receive-events/receive-events.component';
import { LinearProcessDiagramComponent } from './components/linear-process-diagram/linear-process-diagram.component';
import { FishboneTimelineComponent } from './components/fishbone-timeline/fishbone-timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    ReceiveEventsComponent,
    LinearProcessDiagramComponent,
    FishboneTimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
