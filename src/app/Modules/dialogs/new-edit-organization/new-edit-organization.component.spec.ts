import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditOrganizationComponent } from './new-edit-organization.component';

describe('NewEditOrganizationComponent', () => {
  let component: NewEditOrganizationComponent;
  let fixture: ComponentFixture<NewEditOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
