import { Component, OnInit, OnDestroy } from '@angular/core';
import { countriesList, appTitle } from './constants/application-constants';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = appTitle;
  countriesList = countriesList;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.activatedRoute.url.subscribe((url: UrlSegment[]) =>
    //   console.log(url[0].path)
    // );
  }
}
