import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { PlatformService } from '../../../services/platform.service';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter implements AfterViewInit {
  @Input({ required: true }) target!: number;
  @Input() duration = 1800;
  @Input() suffix = '';
  @Input({ required: true }) label!: string;

  @ViewChild('counterRef', { static: true })
  counterRef!: ElementRef<HTMLDivElement>;

  readonly value = signal(0);

  private started = false;
  private observer?: IntersectionObserver;
  private platformService = inject(PlatformService);
  constructor() {}

  ngAfterViewInit(): void {
    this.platformService.runOnBrowser(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.started) {
            this.started = true;
            this.startAnimation();
          }
        },
        {
          threshold: 0.3,
        },
      );

      this.observer.observe(this.counterRef.nativeElement);
    });
  }

  private startAnimation(): void {
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / this.duration);

      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);

      this.value.set(Math.round(this.target * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
