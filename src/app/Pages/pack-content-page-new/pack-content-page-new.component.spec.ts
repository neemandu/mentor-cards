import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackContentPageNewComponent } from './pack-content-page-new.component';

describe('PackContentPageNewComponent', () => {
  let component: PackContentPageNewComponent;
  let fixture: ComponentFixture<PackContentPageNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackContentPageNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackContentPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
