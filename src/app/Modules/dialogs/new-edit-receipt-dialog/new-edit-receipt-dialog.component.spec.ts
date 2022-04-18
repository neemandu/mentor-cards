import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditReceiptDialogComponent } from './new-edit-receipt-dialog.component';

describe('NewEditReceiptDialogComponent', () => {
  let component: NewEditReceiptDialogComponent;
  let fixture: ComponentFixture<NewEditReceiptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditReceiptDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditReceiptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
