import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: `
    <div
      [attr.class]="
        (success ? 'bg-success' : 'bg-' + errorColor) +
        ' h-3 w-3 m rounded-full m-1'
      "
      [title]="errorText ? errorText : 'valid'"
    ></div>
  `,
  styles: [],
})
export class BadgeComponent {
  @Input('success') success: boolean = false;
  @Input('errorText') errorText: string = '';
  @Input('errorColor') errorColor: 'success' | 'warning' | 'error' | 'info' =
    'error';

  constructor() {}
}
