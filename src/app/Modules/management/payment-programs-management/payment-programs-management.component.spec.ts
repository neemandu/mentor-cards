import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProgramsManagementComponent } from './payment-programs-management.component';

describe('PaymentProgramsManagementComponent', () => {
  let component: PaymentProgramsManagementComponent;
  let fixture: ComponentFixture<PaymentProgramsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentProgramsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentProgramsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
