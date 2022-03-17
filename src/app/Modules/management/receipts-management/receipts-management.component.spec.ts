import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsManagementComponent } from './receipts-management.component';

describe('ReceiptsManagementComponent', () => {
  let component: ReceiptsManagementComponent;
  let fixture: ComponentFixture<ReceiptsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
