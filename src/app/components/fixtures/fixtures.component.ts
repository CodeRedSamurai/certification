import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Fixtures, Response } from 'src/app/interface/fixtures';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss'],
})
export class FixturesComponent implements OnInit {
  leagueId: string | null = '';
  teamId: string | null = '';
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

    this.apiService
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
}
