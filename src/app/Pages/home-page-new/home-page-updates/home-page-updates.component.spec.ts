import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageUpdatesComponent } from './home-page-updates.component';

describe('HomePageUpdatesComponent', () => {
  let component: HomePageUpdatesComponent;
  let fixture: ComponentFixture<HomePageUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
