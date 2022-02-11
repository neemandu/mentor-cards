import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPackChoiseComponent } from './company-pack-choise.component';

describe('CompanyPackChoiseComponent', () => {
  let component: CompanyPackChoiseComponent;
  let fixture: ComponentFixture<CompanyPackChoiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyPackChoiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPackChoiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
