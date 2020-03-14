import { Injectable } from '@angular/core';
import { Observable, identity } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PushServiceService {

  constructor() { }


  newEventSource(path: string): EventSource {
    return new EventSource(path);
  }

  newObservable<R>(path: string, converter: (data: string) => R = _.identity): Observable<R> {
    return new Observable(observer => {
      const eventSource = this.newEventSource(path);
      eventSource.onmessage = event => {
        observer.next(converter(event.data));
      };
      eventSource.onerror = () => {
        if (eventSource.readyState !== eventSource.CONNECTING) {
          observer.error('An error occurred.');
          console.log('An error occurred.');
        }
        //eventSource.close();
        //observer.complete();
      };
      return () => {
        //eventSource.close();
      };
    });
  }
}
