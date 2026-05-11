import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ContentChildren,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { LegalSection } from '../legal-section/legal-section';
import { Navbar } from '../../site/navbar/navbar';
import { RouterLink } from '@angular/router';
import {
  LucideChevronRight,
  LucideArrowUp,
  LucideSearch,
  LucideFileText,
  LucideShieldCheck,
  LucideEarth,
} from '@lucide/angular';
import { NgClass } from '@angular/common';
import { Footer } from '../../site/footer/footer';
import { debounceTime, Subject } from 'rxjs';
import { PlatformService } from '../../../services/platform.service';

@Component({
  selector: 'app-legal-layout',
  imports: [
    Navbar,
    RouterLink,
    LucideChevronRight,
    NgClass,
    LucideArrowUp,
    Footer,
    LucideSearch,
    LucideFileText,
    LucideShieldCheck,
    LucideEarth,
  ],
  templateUrl: './legal-layout.html',
  styleUrl: './legal-layout.css',
})
export class LegalLayout implements OnInit, OnDestroy, AfterViewInit {
  @Input() eyebrow!: string;
  @Input() title!: string;
  @Input() intro!: string;
  @Input() lastUpdated!: string;
  @Input() version!: string;
  @ViewChild('articleRef') articleRef!: ElementRef<HTMLDivElement>;
  @ContentChildren(LegalSection) sections!: QueryList<LegalSection>;

  public cdr = inject(ChangeDetectorRef);
  public progress = 0;
  public query = '';
  public activeId = '';
  public showTop = false;
  public filteredSections: LegalSection[] = [];
  public links = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/use-of-service', label: 'Use of Service' },
  ];

  public onScroll = () => {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    this.progress = total > 0 ? (h.scrollTop / total) * 100 : 0;
    this.showTop = h.scrollTop > 600;

    let current = this.sections.first?.id ?? '';
    for (const s of this.sections) {
      const el = document.getElementById(s.id);
      if (el && el.getBoundingClientRect().top - 120 <= 0) current = s.id;
    }
    this.activeId = current;
  };

  public search$ = new Subject<string>();
  private platformService = inject(PlatformService);

  constructor() {}

  ngOnInit() {
    this.search$.pipe(debounceTime(500)).subscribe((query) => {
      this.query = query;
      this.filteredSections = this.sections.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.id.toLowerCase().includes(query.toLowerCase()),
      );
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.platformService.runOnBrowser(() =>
      window.removeEventListener('scroll', this.onScroll),
    );
  }

  ngAfterViewInit() {
    this.filteredSections = this.sections.toArray();
    this.cdr.detectChanges();
    this.platformService.runOnBrowser(() => {
      this.onScroll();
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  print() {
    window.print();
  }

  scrollToTop() {
    this.platformService.runOnBrowser(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  search(query: string) {
    this.search$.next(query);
  }
}
