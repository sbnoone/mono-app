import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input({ required: true }) size: 'sm' | 'md' | 'lg' = 'md'
  @Input({ required: true }) variant: 'primary' | 'secondary' | 'transparent' =
    'primary'
}
