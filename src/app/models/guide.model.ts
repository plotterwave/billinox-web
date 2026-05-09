export const GuideCategories = [
  'All',
  'Getting Started',
  'Invoice Creation',
  'Customer Management',
  'Payment Tracking',
  'PDF Export',
  'Cloud Backup',
  'Multi-device Sync',
  'Tips & Productivity',
  'Troubleshooting',
] as const;

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: (typeof GuideCategories)[number];
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  date: string;
  views: number;
  videoId: string; // YouTube ID placeholder
}
