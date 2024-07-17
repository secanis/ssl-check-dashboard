import { Component, EventEmitter } from '@angular/core';
import { AppRepository } from 'src/app/state/app.repository';
import { DataRepository } from '../../state/data.repository';
import { Observable } from 'rxjs';
import { State } from '../../../../../server/src/types';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent {
  changeMinimized$ = new EventEmitter<boolean>();
  changeShowGrid$ = new EventEmitter<boolean>();
  minimized$ = new Observable<boolean>();
  showGrid$ = new Observable<boolean>();
  state$ = new Observable<State>();

  constructor(
    private dataRepo: DataRepository,
    private appRepo: AppRepository
  ) {
    this.changeMinimized$.subscribe((minimized) => {
      this.appRepo.setMinimized(minimized);
    });
    this.changeShowGrid$.subscribe((showGrid) => {
      this.appRepo.setShowGrid(showGrid);
    });

    this.minimized$ = this.appRepo.getMinimized();
    this.showGrid$ = this.appRepo.getShowGrid();
    this.state$ = this.dataRepo.getCurrentState();
  }
}
