import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogWithdrawsComponent } from './add-dialog-withdraws.component';

describe('AddDialogWithdrawsComponent', () => {
  let component: AddDialogWithdrawsComponent;
  let fixture: ComponentFixture<AddDialogWithdrawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDialogWithdrawsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogWithdrawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
