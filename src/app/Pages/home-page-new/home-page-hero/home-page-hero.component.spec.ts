import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageHeroComponent } from './home-page-hero.component';

describe('HomePageHeroComponent', () => {
  let component: HomePageHeroComponent;
  let fixture: ComponentFixture<HomePageHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
