import { Component, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Navbar } from '../../components/site/navbar/navbar';
import { RouterLink } from '@angular/router';
import { LucideChevronRight, LucideSparkles, LucideSearch, LucideMail, LucideCalendar, LucideClock, LucideArrowRight, LucideTag } from '@lucide/angular';
import { AsyncPipe, NgClass } from '@angular/common';
import { Footer } from '../../components/site/footer/footer';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmButton } from '@spartan-ng/helm/button';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-blog',
  imports: [
    Navbar,
    RouterLink,
    LucideChevronRight,
    LucideSparkles,
    LucideSearch,
    AsyncPipe,
    NgClass,
    LucideMail,
    Footer,
    LucideCalendar,
    LucideClock,
    LucideArrowRight,
    LucideTag,
    HlmInput,
    HlmButton, DateFormatPipe
],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  public categories: string[] = [];
  public posts: BlogPost[] = [];
  public filtered: BlogPost[] = [];
  public query$ = new BehaviorSubject('');
  public category$ = new BehaviorSubject('All');
  public featured$ = new BehaviorSubject<BlogPost | null | undefined>(null);
  public visible = 6;
  public shown = this.filtered.slice(0, this.visible);
  private blogService = inject(BlogService);

  constructor() {
    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {},
    });

    this.blogService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {},
    });

    this.blogService.getFeaturedPost().subscribe({
      next: (post) => {
        this.featured$.next(post);
      },
      error: (error) => {},
    });

    

    combineLatest([this.category$, this.featured$, this.query$]).subscribe(
      ([category, featured, query]) => {
        const q = query.trim().toLowerCase();
        this.filtered = this.posts
          .filter((p) => p.id !== featured?.id || category !== 'All' || query)
          .filter((p) => category === 'All' || p.category === category)
          .filter(
            (p) =>
              !q ||
              p.title.toLowerCase().includes(q) ||
              p.excerpt.toLowerCase().includes(q) ||
              p.tags.some((t) => t.toLowerCase().includes(q)),
          );

        this.shown = this.filtered.slice(0, this.visible);
      },
    );
  }

  search(query: string) {
    this.query$.next(query);
  }

  setCategory(value: string) {
    this.category$.next(value);
  }

  setVisible(value: number) {
    this.visible = value;
  }
}
