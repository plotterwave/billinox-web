import { inject, Injectable, REQUEST } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private request = inject(REQUEST);

  get baseUrl() {
    // Access full URL or specific headers like host
    const host = this.request?.headers.get('host') || 'localhost';
    const protocol = this.request?.headers.get('x-forwarded-proto') || 'http';
    return this.request?.url || 'https://billinox.com'; // 'http://localhost:4200'//`${protocol}://${host}`;
  }
}
