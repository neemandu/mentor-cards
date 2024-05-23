import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageTryThisComponent } from './home-page-try-this.component';

describe('HomePageTryThisComponent', () => {
  let component: HomePageTryThisComponent;
  let fixture: ComponentFixture<HomePageTryThisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageTryThisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageTryThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
