import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Standings, Standing } from 'src/app/interface/standings';
import { tableHeadings } from 'src/app/constants/application-constants';
import { defaultLeagueId } from 'src/app/constants/application-constants';
@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit {
  standingsResponse: Standing[] = [];
  leagueId: string = '';
  tableHeadings: string[] = tableHeadings;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.leagueId = params['id'] || defaultLeagueId;
      this.apiService
        .getStandings(this.leagueId)
        .subscribe((standings: Standings) => {
          this.standingsResponse = standings['response'][0].league.standings[0];
        });
    });
  }

  getTeamFixtures(teamStanding: Standing): void {
    this.router.navigateByUrl(
      `fixtures/${this.leagueId}/${teamStanding.team.id}`
    );
  }
}
