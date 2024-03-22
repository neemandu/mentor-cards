import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateWithdrawsComponent } from './affiliate-withdraws.component';

describe('AffiliateWithdrawsComponent', () => {
  let component: AffiliateWithdrawsComponent;
  let fixture: ComponentFixture<AffiliateWithdrawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliateWithdrawsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateWithdrawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
