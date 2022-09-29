import { Component, OnInit, EventEmitter } from '@angular/core';
import { AppRepository } from 'src/app/state/app.repository';
import { DataRepository } from '../../state/data.repository';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent implements OnInit {
  changeMinimized$ = new EventEmitter<boolean>();
  changeShowGrid$ = new EventEmitter<boolean>();
  minimized$ = this.appRepo.getMinimized();
  showGrid$ = this.appRepo.getShowGrid();

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
  }

  state$ = this.dataRepo.getCurrentState();

  ngOnInit(): void {}
}
