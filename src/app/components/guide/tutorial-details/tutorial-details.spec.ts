import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDetails } from './tutorial-details';

describe('TutorialDetails', () => {
  let component: TutorialDetails;
  let fixture: ComponentFixture<TutorialDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
