import { Component, OnInit } from '@angular/core';
import { DataRepository } from '../../state/data.repository';
import { DataService } from '../../shared/services/data.service';
import { map, startWith } from 'rxjs';
import { AppRepository } from '../../state/app.repository';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dataRepo: DataRepository,
    private appRepo: AppRepository,
    private dataService: DataService
  ) {
    this.dataService.init();
  }

  data$ = this.dataRepo.getSslData().pipe(startWith([]));
  connected$ = this.dataRepo
    .getCurrentState()
    .pipe(map((state) => state.connected));
  minimized$ = this.appRepo.getMinimized();
  showGrid$ = this.appRepo.getShowGrid();

  ngOnInit(): void {}
}
