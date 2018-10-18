import {State} from './../reducers/index';
import {Observable} from 'rxjs';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ls-launches-table',
  templateUrl: './ls-launches-table.component.html',
})
export class LsLaunchesTable {
  public launches$: Observable<any>;
  public txt = 'Results: ';
  public cols = [{
    id: 'ID',
    name: 'Name'
  }];

  constructor(private store: Store<State>) {
    this.launches$ = this.store.select('filteredLaunches');
  }
}
