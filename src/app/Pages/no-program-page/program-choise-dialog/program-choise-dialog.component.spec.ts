import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramChoiseDialogComponent } from './program-choise-dialog.component';

describe('ProgramChoiseDialogComponent', () => {
  let component: ProgramChoiseDialogComponent;
  let fixture: ComponentFixture<ProgramChoiseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramChoiseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramChoiseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
