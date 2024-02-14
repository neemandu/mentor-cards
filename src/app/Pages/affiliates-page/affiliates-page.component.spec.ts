import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatesPageComponent } from './affiliates-page.component';

describe('AffiliatesPageComponent', () => {
  let component: AffiliatesPageComponent;
  let fixture: ComponentFixture<AffiliatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliatesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
