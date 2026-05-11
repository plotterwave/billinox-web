import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  Router,
  withInMemoryScrolling,
  withNavigationErrorHandler,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';
import { provideNgIconLoader, withCaching } from '@ng-icons/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import {
  MARKED_EXTENSIONS,
  MARKED_OPTIONS,
  provideMarkdown,
} from 'ngx-markdown';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { UrlService } from './services/url.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withRouterConfig({ urlUpdateStrategy: 'deferred' }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withNavigationErrorHandler((error) => {
        const router = inject(Router);
        if (error?.error.message) {
          console.error('Navigation error occurred:', error.error.message);
        }
        router.navigate(['/error'], {});
      }),
    ),
    provideHttpClient(withFetch()),
    provideNgIconLoader((name) => {
      const http = inject(HttpClient);
      const urlService = inject(UrlService);
      return http.get(`${urlService.baseUrl}/icons/${name}.svg`, {
        responseType: 'text',
      });
    }, withCaching()),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true,
        },
      },
      markedExtensions: [
        {
          provide: MARKED_EXTENSIONS,
          useFactory: gfmHeadingId,
          multi: true,
        },
      ],
    }),
    provideClientHydration(withEventReplay()),
  ],
};
