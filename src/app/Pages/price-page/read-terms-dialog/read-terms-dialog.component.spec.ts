import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTermsDialogComponent } from './read-terms-dialog.component';

describe('ReadTermsDialogComponent', () => {
  let component: ReadTermsDialogComponent;
  let fixture: ComponentFixture<ReadTermsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadTermsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTermsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
