import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  TIMER_STATES = ['focus', 'break-short', 'focus', 'break-long'] as const
  isPlaying = false
  state = 0
  variant = this.TIMER_STATES[this.state]

  changeState = () => {
    this.isPlaying = false
    const nextState = (this.state + 1) % this.TIMER_STATES.length
    this.state = nextState
    this.variant = this.TIMER_STATES[nextState]

    // if (settings.hasNotifications) {
    //   toast.success(`Current state - ${NOTIFICATION_MESSAGES[this.TIMER_STATES[this.state]]}`)
    // }
  }
}
