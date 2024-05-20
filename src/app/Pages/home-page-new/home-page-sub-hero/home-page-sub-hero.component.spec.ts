import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSubHeroComponent } from './home-page-sub-hero.component';

describe('HomePageSubHeroComponent', () => {
  let component: HomePageSubHeroComponent;
  let fixture: ComponentFixture<HomePageSubHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageSubHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageSubHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
