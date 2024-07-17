import { Component } from '@angular/core';
import { DataRepository } from '../../state/data.repository';
import { DataService } from '../../shared/services/data.service';
import { map, Observable, startWith } from 'rxjs';
import { AppRepository } from '../../state/app.repository';
import { SslCheck } from '../../../../../server/src/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  data$ = new Observable<SslCheck[]>();
  connected$ = new Observable<boolean>();
  minimized$ = new Observable<boolean>();
  showGrid$ = new Observable<boolean>();

  constructor(
    private dataRepo: DataRepository,
    private appRepo: AppRepository,
    private dataService: DataService
  ) {
    this.dataService.init();

    this.data$ = this.dataRepo.getSslData().pipe(startWith([]));
    this.connected$ = this.dataRepo
      .getCurrentState()
      .pipe(map((state) => state.connected ?? false));
    this.minimized$ = this.appRepo.getMinimized();
    this.showGrid$ = this.appRepo.getShowGrid();
  }
}
