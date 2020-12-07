import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProgramPageComponent } from './no-program-page.component';

describe('NoProgramPageComponent', () => {
  let component: NoProgramPageComponent;
  let fixture: ComponentFixture<NoProgramPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoProgramPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoProgramPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
