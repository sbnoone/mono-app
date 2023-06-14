import { Component, Input } from '@angular/core';
// import BrainSvg from '@pomo/assets/icons/ph_brain-fill.svg';
// import CoffeeSvg from '@pomo/assets/icons/ph_coffee.svg';

type TimerState = 'focus' | 'break-short' | 'break-long';
@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent {
  @Input({ required: true }) variant: TimerState = 'focus';
  config = {
    focus: {
      icon: '@pomo/assets/icons/ph_brain-fill.svg',
      text: 'Focus',
    },
    'break-long': {
      icon: '@pomo/assets/icons/ph_coffee.svg',
      text: 'Break long',
    },
    'break-short': {
      icon: '@pomo/assets/icons/ph_coffee.svg',
      text: 'Break short',
    },
  };
}
