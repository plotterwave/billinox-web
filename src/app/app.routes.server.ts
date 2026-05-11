import { RenderMode, ServerRoute } from '@angular/ssr';
import { BlogService } from './services/blog.service';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const blogService = inject(BlogService);
      const slugs = await blogService.getSlugs();
      return slugs.map((d) => ({ slug: d }));
    },
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
