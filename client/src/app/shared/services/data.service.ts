import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthRepository } from '../../state/auth.repository';
import { DataRepository } from '../../state/data.repository';
import { SocketService } from './socket.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private http: HttpClient,
    private authRepo: AuthRepository,
    private dataRepo: DataRepository,
    private socketService: SocketService,
    private router: Router
  ) {}

  init() {
    this.authRepo.getSession().subscribe((session) => {
      if (session.token) {
        this.socketService.createAsync(session.token);
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
