import { Component, Input } from '@angular/core';
import { SafeUrlPipe } from '../../../pipes/safe-url-pipe';

@Component({
  selector: 'app-tutorial-player',
  imports: [SafeUrlPipe],
  templateUrl: './tutorial-player.html',
  styleUrl: './tutorial-player.css',
})
export class TutorialPlayer {
  @Input() videoId: string = '';
  @Input() title: string = 'Tutorial Video';

  embedUrl: string = '';

  ngOnChanges(): void {
    if (this.videoId) {
      this.embedUrl = `https://www.youtube.com/embed/${this.videoId}`;
    }
  }
}
