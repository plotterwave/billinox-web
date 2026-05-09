import { Component } from '@angular/core';
import { Navbar } from '../../components/site/navbar/navbar';
import {
  LucideAccessibility,
  LucideDynamicIcon,
  LucideLock,
  LucideShieldCheck,
  LucideSparkles,
  LucideWifiOff,
  LucideZap,
  LucideHeart,
  LucideArrowRight,
  LucidePlay,
} from '@lucide/angular';
import { lucideGithub, lucideLinkedin, lucideTwitter } from '@ng-icons/lucide';
import { NgIconComponent } from '@ng-icons/core';
import { Counter } from '../../components/shared/counter/counter';
import { Footer } from '../../components/site/footer/footer';

@Component({
  selector: 'app-about',
  imports: [
    Navbar,
    LucideDynamicIcon,
    NgIconComponent,
    Counter,
    LucideHeart,
    LucideArrowRight,
    LucidePlay,
    Footer,
  ],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  public values = [
    {
      icon: LucideSparkles,
      title: 'Simplicity',
      desc: 'A clean, focused interface that gets out of your way so you can invoice in seconds.',
    },
    {
      icon: LucideShieldCheck,
      title: 'Reliability',
      desc: 'Built to work every day, on every device, with predictable performance.',
    },
    {
      icon: LucideLock,
      title: 'Privacy',
      desc: 'Your data lives on your device first. We never sell or share business records.',
    },
    {
      icon: LucideZap,
      title: 'Speed',
      desc: 'Instant invoice generation, fast PDF exports, and snappy navigation everywhere.',
    },
    {
      icon: LucideAccessibility,
      title: 'Accessibility',
      desc: 'Designed to meet WCAG standards and work for every business owner.',
    },
    {
      icon: LucideWifiOff,
      title: 'Offline-first',
      desc: "Run your business without an internet connection — sync when you're ready.",
    },
  ];

  public milestones = [
    {
      year: '2023',
      title: 'The Vision',
      desc: 'Billinox is conceived as an offline-first answer to bloated billing tools.',
    },
    {
      year: '2024',
      title: 'First Release',
      desc: 'Launch of core invoicing, customer management, and PDF exports.',
    },
    {
      year: '2025',
      title: 'Cloud Sync',
      desc: 'Optional encrypted cloud backups and seamless multi-device sync.',
    },
    {
      year: '2026',
      title: 'Global Reach',
      desc: 'Multi-currency support and regional compliance across continents.',
    },
    {
      year: 'Next',
      title: "What's Coming",
      desc: 'Smart payment reminders, AI-assisted bookkeeping, and team workflows.',
    },
  ];

  public team = [
    { name: 'Adaeze Okafor', role: 'Founder & CEO', initials: 'AO' },
    { name: 'Marcus Bennett', role: 'Head of Product', initials: 'MB' },
    { name: 'Sara Lindqvist', role: 'Lead Engineer', initials: 'SL' },
    { name: 'Daniel Kim', role: 'Design & Brand', initials: 'DK' },
  ];

  lucideTwitter = lucideTwitter;
  lucideGithub = lucideGithub;
  lucideLinkedin = lucideLinkedin;
}
