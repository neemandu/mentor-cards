import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePagePartnersComponent } from './home-page-partners.component';

describe('HomePagePartnersComponent', () => {
  let component: HomePagePartnersComponent;
  let fixture: ComponentFixture<HomePagePartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePagePartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePagePartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
