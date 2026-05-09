import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TutorialPlayer } from '../tutorial-player/tutorial-player';
import { DifficultyBadge } from '../difficulty-badge/difficulty-badge';
import { Tutorial } from '../../../models/guide.model';
import { LucideX } from '@lucide/angular';

@Component({
  selector: 'app-tutorial-details',
  imports: [TutorialPlayer, DifficultyBadge, LucideX],
  templateUrl: './tutorial-details.html',
  styleUrl: './tutorial-details.css',
})
export class TutorialDetails {
  @Input() openVideo!: Tutorial;
  @Input() relatedVideos: Tutorial[] = [];
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }

  watchVideo(video: Tutorial) {
    this.openVideo = video;
  }
}
