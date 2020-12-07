import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackContentPageComponent } from './pack-content-page.component';

describe('PackContentPageComponent', () => {
  let component: PackContentPageComponent;
  let fixture: ComponentFixture<PackContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackContentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
