import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Fixtures, Response } from 'src/app/interface/fixtures';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss'],
})
export class FixturesComponent implements OnInit, OnDestroy {
  leagueId: string | null = '';
  teamId: string | null = '';
  $apiService!: Subscription;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}
  hardcode: number = 10;
  fixturesResponse: Response[] = [];
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.leagueId = paramMap.get('id');
      this.teamId = paramMap.get('teamId');
    });

    this.$apiService = this.apiService
      .getFixtures(this.teamId, this.leagueId)
      .subscribe((fixtures: Fixtures) => {
        this.fixturesResponse = fixtures['response'];
      });
  }

  backToStandings(): void {
    this.router.navigateByUrl(`standings/${this.leagueId}`);
  }
  trackByIndex(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    this.$apiService?.unsubscribe();
  }
}
