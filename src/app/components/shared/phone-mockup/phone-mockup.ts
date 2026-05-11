import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-phone-mockup',
  imports: [NgClass],
  templateUrl: './phone-mockup.html',
  styleUrl: './phone-mockup.css',
})
export class PhoneMockup {
@Input() styleClass?: string;
}
