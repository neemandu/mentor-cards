import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageAdvantageComponent } from './home-page-advantage.component';

describe('HomePageAdvantageComponent', () => {
  let component: HomePageAdvantageComponent;
  let fixture: ComponentFixture<HomePageAdvantageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageAdvantageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageAdvantageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
