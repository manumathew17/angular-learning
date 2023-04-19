import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyWithEmployeeComponent } from './add-company-with-employee.component';

describe('AddCompanyWithEmployeeComponent', () => {
  let component: AddCompanyWithEmployeeComponent;
  let fixture: ComponentFixture<AddCompanyWithEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyWithEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyWithEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
