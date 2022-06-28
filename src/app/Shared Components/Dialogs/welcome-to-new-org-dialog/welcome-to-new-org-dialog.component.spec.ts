import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeToNewOrgDialogComponent } from './welcome-to-new-org-dialog.component';

describe('WelcomeToNewOrgDialogComponent', () => {
  let component: WelcomeToNewOrgDialogComponent;
  let fixture: ComponentFixture<WelcomeToNewOrgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeToNewOrgDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeToNewOrgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
