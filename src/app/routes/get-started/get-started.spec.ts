import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStartedPage } from './get-started';

describe('GetStarted', () => {
  let component: GetStartedPage;
  let fixture: ComponentFixture<GetStartedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetStartedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStartedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
