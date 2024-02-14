import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyCommonLinkDialogComponentComponent } from './copy-common-link-dialog-component.component';

describe('CopyCommonLinkDialogComponentComponent', () => {
  let component: CopyCommonLinkDialogComponentComponent;
  let fixture: ComponentFixture<CopyCommonLinkDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyCommonLinkDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyCommonLinkDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
