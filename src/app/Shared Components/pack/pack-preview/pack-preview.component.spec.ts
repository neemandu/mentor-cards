import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackPreviewComponent } from './pack-preview.component';

describe('PackPreviewComponent', () => {
  let component: PackPreviewComponent;
  let fixture: ComponentFixture<PackPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
