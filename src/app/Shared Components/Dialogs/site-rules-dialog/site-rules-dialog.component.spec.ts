import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRulesDialogComponent } from './site-rules-dialog.component';

describe('SiteRulesDialogComponent', () => {
  let component: SiteRulesDialogComponent;
  let fixture: ComponentFixture<SiteRulesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteRulesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteRulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
