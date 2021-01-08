import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogYesNoComponent } from './dynamic-dialog-yes-no.component';

describe('DynamicDialogYesNoComponent', () => {
  let component: DynamicDialogYesNoComponent;
  let fixture: ComponentFixture<DynamicDialogYesNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDialogYesNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogYesNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
