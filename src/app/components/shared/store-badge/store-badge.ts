import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { lucideApple } from '@ng-icons/lucide';

@Component({
  selector: 'app-store-badge',
  imports: [NgIcon],
  templateUrl: './store-badge.html',
  styleUrl: './store-badge.css',
})
export class StoreBadge {
  @Input() store: 'play' | 'app' = 'play';
  public lucideApple = lucideApple;
  get isPlay() {
    return this.store === 'play';
  }
}
