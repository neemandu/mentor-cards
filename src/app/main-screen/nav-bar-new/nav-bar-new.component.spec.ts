import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarNewComponent } from './nav-bar-new.component';

describe('NavBarNewComponent', () => {
  let component: NavBarNewComponent;
  let fixture: ComponentFixture<NavBarNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
