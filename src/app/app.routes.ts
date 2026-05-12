import { Routes } from '@angular/router';
import { blogPostResolver } from './resolvers/blog-post-resolver';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha-2';
import { environment } from '../environments/environment';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home').then((m) => m.Home),
  },
  {
    providers: [
      {
        provide: RECAPTCHA_V3_SITE_KEY,
        useValue: environment.recaptchaSiteKey,
      },
    ],
    path: 'blog',
    loadComponent: () => import('./routes/blog/blog').then((m) => m.Blog),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./routes/blog-article/blog-article').then((m) => m.BlogArticle),
    resolve: {
      post: blogPostResolver,
    },
  },
  {
    path: 'get-started',
    loadComponent: () =>
      import('./routes/get-started/get-started').then((m) => m.GetStartedPage),
  },
  {
    path: 'help-center',
    loadComponent: () => import('./routes/help/help').then((m) => m.HelpPage),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./routes/about/about').then((m) => m.AboutPage),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./routes/contact/contact').then((m) => m.ContactPage),
  },
  {
    path: 'guides',
    loadComponent: () => import('./routes/guides/guides').then((m) => m.Guides),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./routes/privacy/privacy').then((m) => m.Privacy),
  },
  {
    path: 'terms',
    loadComponent: () => import('./routes/terms/terms').then((m) => m.Terms),
  },
  {
    path: 'use-of-service',
    loadComponent: () =>
      import('./routes/use-of-service/use-of-service').then(
        (m) => m.UseOfService,
      ),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./routes/errors/error/error').then((m) => m.Error),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./routes/errors/not-found-error/not-found-error').then(
        (m) => m.NotFoundError,
      ),
  },
];
