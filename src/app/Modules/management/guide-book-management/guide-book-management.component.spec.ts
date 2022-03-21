import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideBookManagementComponent } from './guide-book-management.component';

describe('GuideBookManagementComponent', () => {
  let component: GuideBookManagementComponent;
  let fixture: ComponentFixture<GuideBookManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideBookManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideBookManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
