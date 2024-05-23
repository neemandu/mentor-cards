import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageHowToUseComponent } from './home-page-how-to-use.component';

describe('HomePageHowToUseComponent', () => {
  let component: HomePageHowToUseComponent;
  let fixture: ComponentFixture<HomePageHowToUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageHowToUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageHowToUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
