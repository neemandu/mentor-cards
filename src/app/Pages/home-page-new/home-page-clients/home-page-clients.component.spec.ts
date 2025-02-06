import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageClientsComponent } from './home-page-clients.component';

describe('HomePageClientsComponent', () => {
  let component: HomePageClientsComponent;
  let fixture: ComponentFixture<HomePageClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
