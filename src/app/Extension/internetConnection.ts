import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

export class InternetConnection {
    online$: Observable<boolean>;
    name: string;

    constructor() {
        this.online$ = merge(
          of(navigator.onLine),
          fromEvent(window, 'online').pipe(mapTo(true)),
          fromEvent(window, 'offline').pipe(mapTo(false))
        )
      }
       //Alert
     internetAlert() {
     alert("You are not connected to Internet!");
}

// convertUtc(utcDate){
//   var localDate = new Date(utcDate);
//   var diffDate = this.datePipe.transform(localDate,"yyyy-MM-dd")
//   return diffDate;
// } 
    
}