import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { blogPostResolver } from './blog-post-resolver';

describe('blogPostResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => blogPostResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
