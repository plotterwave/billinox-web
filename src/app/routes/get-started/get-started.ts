import { Component } from '@angular/core';
import {
  LucideApple,
  LucideCloud,
  LucideDownload,
  LucideFileText,
  LucideMonitor,
  LucideRefreshCw,
  LucideSend,
  LucideSmartphone,
  LucideSparkles,
  LucideTablet,
  LucideUserPlus,
  LucideUsers,
  LucideWifiOff,
  LucideZap,
  LucideChevronRight,
  LucideStar,
  LucideDynamicIcon,
  LucidePlay,
  LucideArrowRight,
} from '@lucide/angular';
import { Navbar } from '../../components/site/navbar/navbar';
import { RouterLink } from '@angular/router';
import { StoreBadge } from '../../components/shared/store-badge/store-badge';
import { PhoneMockup } from '../../components/shared/phone-mockup/phone-mockup';
import { Footer } from '../../components/site/footer/footer';
import { HlmButton } from "@spartan-ng/helm/button";

@Component({
  selector: 'app-get-started',
  imports: [
    Navbar,
    RouterLink,
    LucideChevronRight,
    LucideSparkles,
    StoreBadge,
    LucideStar,
    PhoneMockup,
    LucideDynamicIcon,
    LucidePlay,
    LucideArrowRight,
    Footer,
    HlmButton
],
  templateUrl: './get-started.html',
  styleUrl: './get-started.css',
})
export class GetStartedPage {
  steps = [
    {
      n: 1,
      title: 'Download Billinox',
      desc: 'Install the free app on your phone or tablet from your store of choice.',
      icon: LucideDownload,
    },
    {
      n: 2,
      title: 'Create your business profile',
      desc: "Add your logo, address, and tax info — once. We'll reuse it everywhere.",
      icon: LucideUserPlus,
    },
    {
      n: 3,
      title: 'Add your customers',
      desc: 'Import from CSV or vCard, or add them one at a time as you go.',
      icon: LucideUsers,
    },
    {
      n: 4,
      title: 'Create invoices',
      desc: "Pick a customer, add line items, choose a template, and you're done.",
      icon: LucideFileText,
    },
    {
      n: 5,
      title: 'Export and share',
      desc: 'Send a PDF, share a link, or print — whatever works for your client.',
      icon: LucideSend,
    },
  ];

  features = [
    {
      icon: LucideWifiOff,
      title: 'Offline-first',
      desc: 'Invoice anywhere, even without a network.',
    },
    {
      icon: LucideZap,
      title: 'Lightning fast',
      desc: 'Every action is instant — no spinners.',
    },
    {
      icon: LucideFileText,
      title: 'Beautiful PDFs',
      desc: 'Templates that look like you hired a designer.',
    },
    {
      icon: LucideCloud,
      title: 'Encrypted backups',
      desc: 'Optional cloud sync, end-to-end encrypted.',
    },
    {
      icon: LucideRefreshCw,
      title: 'Multi-device sync',
      desc: 'Phone, tablet, desktop — always in sync.',
    },
    {
      icon: LucideSparkles,
      title: 'Clean, focused UI',
      desc: 'Designed to disappear so you can work.',
    },
  ];

  platforms = [
    {
      icon: LucideSmartphone,
      name: 'Android',
      note: 'Android 8.0+',
      rating: '4.9',
    },
    {
      icon: LucideApple,
      name: 'iPhone & iPad',
      note: 'iOS 15+',
      rating: '4.8',
    },
    {
      icon: LucideTablet,
      name: 'Tablet',
      note: 'Optimised for large screens',
      rating: '4.9',
    },
    {
      icon: LucideMonitor,
      name: 'Desktop',
      note: 'Web app — Chrome, Safari, Edge',
      rating: '4.9',
    },
  ];
}
