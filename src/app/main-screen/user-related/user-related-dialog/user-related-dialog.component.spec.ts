import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRelatedDialogComponent } from './user-related-dialog.component';

describe('UserRelatedDialogComponent', () => {
  let component: UserRelatedDialogComponent;
  let fixture: ComponentFixture<UserRelatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRelatedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRelatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
