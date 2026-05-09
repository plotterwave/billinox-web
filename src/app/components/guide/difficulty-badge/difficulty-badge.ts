import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-difficulty-badge',
  imports: [NgClass],
  templateUrl: './difficulty-badge.html',
  styleUrl: './difficulty-badge.css',
})
export class DifficultyBadge implements OnInit {
  @Input() difficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';
  styles: string = '';

  ngOnInit(): void {
    switch (this.difficulty) {
      case 'Beginner':
        this.styles =
          'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
        break;
      case 'Intermediate':
        this.styles = 'border-primary/40 bg-primary/15 text-secondary';
        break;
      case 'Advanced':
        this.styles =
          'border-destructive/30 bg-destructive/10 text-destructive';
        break;
      default:
        this.styles =
          'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
        break;
    }
  }
}
