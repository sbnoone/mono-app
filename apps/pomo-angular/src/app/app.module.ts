import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { ChipComponent } from './chip/chip.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { SwitchComponent } from './switch/switch.component';
import { TimerComponent } from './timer/timer.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [AppComponent, ChipComponent, InputNumberComponent, SwitchComponent, TimerComponent, ButtonComponent],
  imports: [BrowserModule, HttpClientModule, AngularSvgIconModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
