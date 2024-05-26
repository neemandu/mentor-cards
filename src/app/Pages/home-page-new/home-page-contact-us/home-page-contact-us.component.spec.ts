import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageContactUsComponent } from './home-page-contact-us.component';

describe('HomePageContactUsComponent', () => {
  let component: HomePageContactUsComponent;
  let fixture: ComponentFixture<HomePageContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageContactUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
