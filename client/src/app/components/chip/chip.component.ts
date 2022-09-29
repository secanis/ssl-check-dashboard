import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chip',
  template: `
    <div class="badge badge-info gap-2 max-w-xs truncate" [title]="title">
      {{ text }}
    </div>
  `,
  styles: [],
})
export class ChipComponent {
  @Input('text') text: string = '';
  @Input('title') title: string = '';
}
