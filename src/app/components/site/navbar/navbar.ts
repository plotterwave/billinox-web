import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LucideMenu, LucideX } from '@lucide/angular';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIconComponent } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PlatformService } from '../../../services/platform.service';

@Component({
  selector: 'app-navbar',
  imports: [
    NgClass,
    LucideMenu,
    LucideX,
    HlmButton,
    NgIconComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  public links = [
    { route: '/', fragment: 'features', label: 'Features' },
    { route: '/', fragment: 'showcase', label: 'Product' },
    { route: '/', fragment: 'pricing', label: 'Pricing' },
    { route: '/guides', label: 'Guides' },
    { route: '/about', label: 'About' },
    { route: '/contact', label: 'Contact' },
  ];

  public scrolled = false;
  public open = false;
  private platformService = inject(PlatformService);

  onScroll = () => (this.scrolled = window.scrollY > 12);

  setOpen(value: boolean) {
    this.open = value;
  }

  ngOnInit(): void {
    this.platformService.runOnBrowser(() =>
      window.addEventListener('scroll', this.onScroll),
    );
  }

  ngOnDestroy(): void {
    this.platformService.runOnBrowser(() =>
      window.removeEventListener('scroll', this.onScroll),
    );
  }
}
