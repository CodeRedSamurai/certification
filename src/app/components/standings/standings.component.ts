import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Standings, Standing } from 'src/app/interface/standings';
import { tableHeadings } from 'src/app/constants/application-constants';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  standingsResponse: Standing[] = [];
  leagueId: string = '';
  tableHeadings: string[] = tableHeadings;
  $apiService!: Subscription;
  $activateRoute!: Subscription;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.$activateRoute = this.activatedRoute.params.subscribe((params) => {
      this.leagueId = params['id'];
      if (this.leagueId) {
        this.$apiService = this.apiService
          .getStandings(this.leagueId)
          .subscribe((standings: Standings) => {
            this.standingsResponse =
              standings['response'][0].league.standings[0];
          });
      }
    });
  }

  getTeamFixtures(teamStanding: Standing): void {
    this.router.navigateByUrl(
      `fixtures/${this.leagueId}/${teamStanding.team.id}`
    );
  }

  trackByIndex(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    this.$apiService?.unsubscribe();
    this.$activateRoute?.unsubscribe();
  }
}
