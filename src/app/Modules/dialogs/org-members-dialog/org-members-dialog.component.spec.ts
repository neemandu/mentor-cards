import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMembersDialogComponent } from './org-members-dialog.component';

describe('OrgMembersDialogComponent', () => {
  let component: OrgMembersDialogComponent;
  let fixture: ComponentFixture<OrgMembersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgMembersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
