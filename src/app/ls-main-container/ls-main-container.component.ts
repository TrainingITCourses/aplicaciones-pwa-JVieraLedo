import {
  LoadLaunchesByAgency,
  LoadLaunchesByMission,
  LoadLaunchesByStatus
} from '../reducers/filters/filtered-launches.actions';

import {State} from '../reducers/index';

import {Component, OnInit} from '@angular/core';
import {Options} from '../options';
import {Store} from '@ngrx/store';
import {LoadAgencies, LoadMissions, LoadStatuses} from '../reducers/values/values.actions';

@Component({
  selector: 'ls-main-container',
  templateUrl: './ls-main-container.component.html',
})
export class MainContainerComponent implements OnInit {
  public isLoading: boolean;
  public tittle = 'Listado de Lanzamientos ( by JoseViLe)';
  public loadingMsg = 'Loading launches...please wait...';

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.store.dispatch(new LoadAgencies());
    this.store.dispatch(new LoadMissions());
    this.store.dispatch(new LoadStatuses());

    this.store.select('values').subscribe(res => {
      this.isLoading = !(res.loadedAgencies && res.loadedMissions && res.loadedStatuses);
    });

    this.store.select('search').subscribe(res => {
      if (res.value === -1) {
        return;
      }

      switch (res.option) {
        case Options.agency:
          this.store.dispatch(new LoadLaunchesByAgency(res.value));
          break;
        case Options.mission:
          this.store.dispatch(new LoadLaunchesByMission(res.value));
          break;
        case Options.status:
          this.store.dispatch(new LoadLaunchesByStatus(res.value));
          break;
      }
    });
  }
}
