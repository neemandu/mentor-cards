import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePurchaseDialogComponent } from './approve-purchase-dialog.component';

describe('ApprovePurchaseDialogComponent', () => {
  let component: ApprovePurchaseDialogComponent;
  let fixture: ComponentFixture<ApprovePurchaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovePurchaseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePurchaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
