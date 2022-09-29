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
          'badge-error': daysRemaining < 30,
          'badge-warning': daysRemaining < 60,
          'badge-success': daysRemaining > 60
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

  constructor() {}

  ngOnInit(): void {}
}
