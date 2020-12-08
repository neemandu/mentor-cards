import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsRevealDialogComponent } from './cards-reveal-dialog.component';

describe('CardsRevealDialogComponent', () => {
  let component: CardsRevealDialogComponent;
  let fixture: ComponentFixture<CardsRevealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsRevealDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsRevealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
