import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { BlogPost } from '../../models/blog.model';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { PlatformService } from '../../services/platform.service';
import { BlogService } from '../../services/blog.service';
import { Navbar } from '../../components/site/navbar/navbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  LucideChevronRight,
  LucideCalendar,
  LucideClock,
  LucideSparkles,
} from '@lucide/angular';
import { DateFormatPipe } from '../../pipes/date-format-pipe';
import { MarkdownComponent } from 'ngx-markdown';
import {
  lucideLink,
  lucideLinkedin,
  lucideTwitter,
} from '@ng-icons/lucide';
import { NgIconComponent } from '@ng-icons/core';
import { Footer } from '../../components/site/footer/footer';

@Component({
  selector: 'app-blog-article',
  imports: [
    Navbar,
    RouterLink,
    LucideChevronRight,
    LucideCalendar,
    DateFormatPipe,
    LucideClock,
    LucideSparkles,
    MarkdownComponent,
    NgIconComponent,
    NgClass,
    Footer,
  ],
  templateUrl: './blog-article.html',
  styleUrl: './blog-article.css',
})
export class BlogArticle implements OnInit, OnDestroy {
  // public post = input.required<BlogPost>();
  public post = signal<BlogPost>({} as BlogPost);
  public related: BlogPost[] = [];
  public progress = 0;
  public author = '';
  public initials = '';
  public onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    this.progress = max > 0 ? (h.scrollTop / max) * 100 : 0;
  };
  public toc: { level: number; text: string; id: string }[] = [];
  public lucideTwitter = lucideTwitter;
  public lucideLinkedin = lucideLinkedin;
  public lucideLink = lucideLink;

  private blogService = inject(BlogService);
  private platformService = inject(PlatformService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.platformService.runOnBrowser(() =>
      window.addEventListener('scroll', this.onScroll),
    );

    this.route.data.subscribe((data)=>{
      this.post.set(data['post']);
    });

    this.author = this.post().author;
    this.initials = this.author
      .split(' ')
      .map((s) => s[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const lines = this.post().content.split('\n');
    this.toc = lines
      .filter((l) => l.startsWith('## ') || l.startsWith('### '))
      .map((l) => {
        const level = l.startsWith('### ') ? 3 : 2;
        const text = l.replace(/^#+\s/, '').trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return { level, text, id };
      });

    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.related = posts
          .filter(
            (p) =>
              p.id !== this.post().id && p.category === this.post().category,
          )
          .slice(0, 3);

        if (this.related.length === 0) {
          this.related = posts
            .filter((p) => p.id !== this.post().id)
            .slice(0, 3);
        }
      },
      error: () => {},
    });
  }

  ngOnDestroy(): void {
    this.platformService.runOnBrowser(() =>
      window.removeEventListener('scroll', this.onScroll),
    );
  }

  copy(label: string) {
    if (label === 'Copy link' && typeof navigator !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
    }
  }
}
