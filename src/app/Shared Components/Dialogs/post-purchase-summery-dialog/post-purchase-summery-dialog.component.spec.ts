import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPurchaseSummeryDialogComponent } from './post-purchase-summery-dialog.component';

describe('PostPurchaseSummeryDialogComponent', () => {
  let component: PostPurchaseSummeryDialogComponent;
  let fixture: ComponentFixture<PostPurchaseSummeryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPurchaseSummeryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPurchaseSummeryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
