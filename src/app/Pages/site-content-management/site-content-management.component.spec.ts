import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteContentManagementComponent } from './site-content-management.component';

describe('SiteContentManagementComponent', () => {
  let component: SiteContentManagementComponent;
  let fixture: ComponentFixture<SiteContentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteContentManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteContentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
