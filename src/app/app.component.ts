import { Component } from '@angular/core';
import { NgxLoader } from 'ngx-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loader = NgxLoader;
  title = 'bookifyUI';
}
