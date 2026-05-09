import { Component, Input } from '@angular/core';
import { LucidePlay } from '@lucide/angular';

@Component({
  selector: 'app-thumbnail',
  imports: [LucidePlay],
  templateUrl: './thumbnail.html',
  styleUrl: './thumbnail.css',
})
export class Thumbnail {
  @Input() videoId: string = '';
  @Input() alt: string = 'Tutorial thumbnail';

  get imageUrl(): string {
    return `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
  }
}
