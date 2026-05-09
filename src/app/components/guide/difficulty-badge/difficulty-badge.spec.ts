import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyBadge } from './difficulty-badge';

describe('DifficultyBadge', () => {
  let component: DifficultyBadge;
  let fixture: ComponentFixture<DifficultyBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifficultyBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifficultyBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
