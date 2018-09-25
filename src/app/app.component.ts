import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'icms';
  
  onActivate(event) {
    window.scroll(0,0);
}
  scrollToBottom() {
    window.scrollTo(0,document.body.scrollHeight)
  }
}

