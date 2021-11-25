import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwChallangeComponent } from './pw-challange.component';

describe('PwChallangeComponent', () => {
  let component: PwChallangeComponent;
  let fixture: ComponentFixture<PwChallangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwChallangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwChallangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
