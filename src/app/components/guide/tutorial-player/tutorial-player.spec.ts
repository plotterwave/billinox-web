import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialPlayer } from './tutorial-player';

describe('TutorialPlayer', () => {
  let component: TutorialPlayer;
  let fixture: ComponentFixture<TutorialPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
