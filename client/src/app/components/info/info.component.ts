import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SslError, State } from '../../../../../server/src/types';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  @Input('state') state!: State | null;
  @Input('errors') errors: SslError[] = [];

  private readonly DEFAULT_PULSE = 'bg-error animate-pulse';

  dropdownOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  pulseColor$: EventEmitter<string> = new EventEmitter();

  constructor() {}

  getPulseColor(e: SslError[], processing: number): string {
    if (e?.length > 0) return this.DEFAULT_PULSE;
    return processing > 0 || processing > 0
      ? 'bg-info text-info-content animate-pulse'
      : 'bg-success text-primary-content';
  }

  toggleDropdown() {
    this.dropdownOpen$.next(!this.dropdownOpen$.value);
  }

  closeDropdown() {
    this.dropdownOpen$.next(false);
  }

  getTextColor(state: State): string {
    if (this.errors && this.errors?.length > 0) return 'text-error';
    if (state.connected && state.queue === 0 && state.processing === 0)
      return 'text-primary-content';
    return 'text-info';
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']) {
      this.pulseColor$.emit(
        this.getPulseColor(
          this.errors,
          changes['state'].currentValue.processing
        )
      );
    }
  }
}
