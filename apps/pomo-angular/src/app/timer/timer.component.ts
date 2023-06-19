import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent {
  @Input() isPlaying: boolean = false
}
