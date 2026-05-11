import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog.model';

export const blogPostResolver: ResolveFn<Observable<BlogPost>> = (
  route,
  state,
) => {
  const blogService = inject(BlogService);
  return blogService.getPostBySlug(route.params['slug']);
};
