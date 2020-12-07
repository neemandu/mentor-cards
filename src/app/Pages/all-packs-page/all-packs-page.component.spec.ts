import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPacksPageComponent } from './all-packs-page.component';

describe('AllPacksPageComponent', () => {
  let component: AllPacksPageComponent;
  let fixture: ComponentFixture<AllPacksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPacksPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPacksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
