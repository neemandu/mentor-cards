import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAffiliateComponent } from './manage-affiliate.component';

describe('ManageAffiliateComponent', () => {
  let component: ManageAffiliateComponent;
  let fixture: ComponentFixture<ManageAffiliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAffiliateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAffiliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
