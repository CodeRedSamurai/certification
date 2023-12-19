import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandingsComponent } from './components/standings/standings.component';
import { FixturesComponent } from './components/fixtures/fixtures.component';
import { ErrorComponent } from './components/error/error.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'standings/:id', component: StandingsComponent },
  { path: 'fixtures/:id/:teamId', component: FixturesComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
