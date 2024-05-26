import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageClientsCardComponent } from './home-page-clients-card.component';

describe('HomePageClientsCardComponent', () => {
  let component: HomePageClientsCardComponent;
  let fixture: ComponentFixture<HomePageClientsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageClientsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageClientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
