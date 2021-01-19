import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterGroupIdDialogComponent } from './enter-group-id-dialog.component';

describe('EnterGroupIdDialogComponent', () => {
  let component: EnterGroupIdDialogComponent;
  let fixture: ComponentFixture<EnterGroupIdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterGroupIdDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterGroupIdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
