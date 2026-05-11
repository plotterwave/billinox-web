import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { BlogPost } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);
  private cache?: Observable<BlogPost[]>;

  public getFeaturedPost(): Observable<BlogPost | undefined> {
    return this.getPosts().pipe(map((d) => d.find((d) => d.featured)));
  }

  public getPosts(): Observable<BlogPost[]> {
    if (this.cache == undefined) {
      this.cache = this.http
        .get<BlogPost[]>('/data/blog.json')
        .pipe(shareReplay(1000));
    }
    return this.cache!;
  }

  public getPostBySlug(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`/data/blog/${slug}.json`);
  }

  public getCategories(): Observable<string[]> {
    return this.getPosts().pipe(
      map((d) => ['All', ...d.map((d) => d.category)]),
    );
  }
}
