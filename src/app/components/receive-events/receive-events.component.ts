import { Component, OnInit } from '@angular/core';
import { PushServiceService } from 'src/app/services/push-service.service';

@Component({
  selector: 'app-receive-events',
  templateUrl: './receive-events.component.html',
  styleUrls: ['./receive-events.component.scss']
})
export class ReceiveEventsComponent implements OnInit {


  private notificationsUrl = '/api/notification' ;

  //private notificationsUrl = 'http://localhost:9090/notification' ;
  constructor(private pushServiceService: PushServiceService) { }

  ngOnInit(): void {
    this.pushServiceService
        .newObservable(this.notificationsUrl)
        .subscribe((watcherEvent: any) => {
          console.log(watcherEvent);
  				document.getElementById("greet").innerHTML += '<br>' + watcherEvent;
        });
  }

}
