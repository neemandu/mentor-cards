import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCardRevealDialogComponent } from './random-card-reveal-dialog.component';

describe('RandomCardRevealDialogComponent', () => {
  let component: RandomCardRevealDialogComponent;
  let fixture: ComponentFixture<RandomCardRevealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomCardRevealDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCardRevealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
