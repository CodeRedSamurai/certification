import { Component } from '@angular/core';
import { appTitle } from './constants/application-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = appTitle;
}
