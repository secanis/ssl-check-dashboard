import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-remaining-days',
  template: `
    <div class="text-sm">
      <span
        [title]="
          daysRemaining + 'days remaining until the certificate runs out'
        "
        [ngClass]="{
          'badge-error': daysRemaining < TEN_DAYS,
          'badge-warning': daysRemaining < THIRTY_DAYS,
          'badge-success': daysRemaining >= THIRTY_DAYS
        }"
        class="badge p-1 px-2 bg-opacity-80 text-xs"
      >
        {{ daysRemaining }} days
      </span>
    </div>
  `,
  styles: [],
})
export class RemainingDaysComponent implements OnInit {
  @Input('daysRemaining') daysRemaining: number = 0;

  readonly TEN_DAYS = 10;
  readonly THIRTY_DAYS = 30;

  constructor() {}

  ngOnInit(): void {}
}
