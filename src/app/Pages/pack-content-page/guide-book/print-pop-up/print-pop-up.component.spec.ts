import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPopUpComponent } from './print-pop-up.component';

describe('PrintPopUpComponent', () => {
  let component: PrintPopUpComponent;
  let fixture: ComponentFixture<PrintPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
