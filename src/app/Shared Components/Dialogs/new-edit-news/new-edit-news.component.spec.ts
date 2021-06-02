import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditNewsComponent } from './new-edit-news.component';

describe('NewEditNewsComponent', () => {
  let component: NewEditNewsComponent;
  let fixture: ComponentFixture<NewEditNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
