import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksCardComponent } from './packs-card.component';

describe('PacksCardComponent', () => {
  let component: PacksCardComponent;
  let fixture: ComponentFixture<PacksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacksCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
