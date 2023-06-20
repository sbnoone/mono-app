import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'

type TimerState = 'focus' | 'break-short' | 'break-long'
@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent {
  @Input({ required: true })
  variant: TimerState = 'focus'

  config = {
    focus: {
      icon: '/assets/icons/ph_brain-fill.svg',
      text: 'Focus',
    },
    'break-long': {
      icon: '/assets/icons/ph_coffee.svg',
      text: 'Break long',
    },
    'break-short': {
      icon: '/assets/icons/ph_coffee.svg',
      text: 'Break short',
    },
  }
}
