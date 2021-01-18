import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditGroupUserDialogComponent } from './new-edit-group-user-dialog.component';

describe('NewEditGroupUserDialogComponent', () => {
  let component: NewEditGroupUserDialogComponent;
  let fixture: ComponentFixture<NewEditGroupUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditGroupUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditGroupUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
