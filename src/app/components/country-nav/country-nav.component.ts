import { Component, OnInit, OnDestroy } from '@angular/core';
import { countriesList } from 'src/app/constants/application-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
interface CountryConfig {
  country: string;
  leagueId: string;
}
@Component({
  selector: 'app-country-nav',
  templateUrl: './country-nav.component.html',
  styleUrls: ['./country-nav.component.scss'],
})
export class CountryNavComponent implements OnInit, OnDestroy {
  countries: CountryConfig[] = countriesList;
  leagueId: string = '';
  $activatedRoute!: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.$activatedRoute = this.activatedRoute.params.subscribe((data) => {
      this.leagueId = data['id'];
    });
  }

  navigateToLeague(country: CountryConfig): void {
    this.router.navigateByUrl(`standings/${country.leagueId}`);
  }

  ngOnDestroy(): void {
    this.$activatedRoute?.unsubscribe();
  }
}
