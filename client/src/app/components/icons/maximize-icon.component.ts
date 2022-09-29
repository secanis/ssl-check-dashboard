import { Component } from '@angular/core';

@Component({
  selector: 'app-maximize-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-maximize-2"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  `,
  styles: [],
})
export class MaximizeIconComponent {
  constructor() {}
}
