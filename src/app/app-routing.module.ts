import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiveEventsComponent } from './components/receive-events/receive-events.component';
import { LinearProcessDiagramComponent } from './components/linear-process-diagram/linear-process-diagram.component';
import { FishboneTimelineComponent } from './components/fishbone-timeline/fishbone-timeline.component';


const routes: Routes = [
  {path : 'receive-events' , component : ReceiveEventsComponent },
  {path : 'fishbone-timeline' , component : FishboneTimelineComponent },
  {path : 'linear-process-diagram' , component : LinearProcessDiagramComponent },
  {path : '' , redirectTo : 'receive-events' , pathMatch : 'full'},
  {path : '**' , redirectTo : 'receive-events' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
