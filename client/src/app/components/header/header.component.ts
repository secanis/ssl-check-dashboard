import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { State, SslError } from '../../../../../server/src/types';
import { AuthRepository } from '../../state/auth.repository';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input('showDetailed') showDetailed: boolean = true;
  @Input('state') state!: State | null;
  @Input('errors') errors: SslError[] = [];
  @Input('minimized') minimized: boolean = false;
  @Input('showGrid') showGrid: boolean = true;

  @Output('changeMinimized') minimized$ = new EventEmitter<boolean>();
  @Output('changeShowGrid') showGrid$ = new EventEmitter<boolean>();

  constructor(private readonly authRepository: AuthRepository) {}

  signout() {
    this.authRepository.logout();
  }
  ngOnInit(): void {}
}
