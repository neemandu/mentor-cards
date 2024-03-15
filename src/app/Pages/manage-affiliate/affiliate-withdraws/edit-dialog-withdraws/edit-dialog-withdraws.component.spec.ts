import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogWithdrawsComponent } from './edit-dialog-withdraws.component';

describe('EditDialogWithdrawsComponent', () => {
  let component: EditDialogWithdrawsComponent;
  let fixture: ComponentFixture<EditDialogWithdrawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogWithdrawsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogWithdrawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
