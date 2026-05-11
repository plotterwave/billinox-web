import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBadge } from './store-badge';

describe('StoreBadge', () => {
  let component: StoreBadge;
  let fixture: ComponentFixture<StoreBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
