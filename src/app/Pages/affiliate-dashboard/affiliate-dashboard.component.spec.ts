import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatesDashboardPageComponent } from './affiliate-dashboard.component';

describe('AffiliatesDashboardPageComponent', () => {
  let component: AffiliatesDashboardPageComponent;
  let fixture: ComponentFixture<AffiliatesDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliatesDashboardPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatesDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
