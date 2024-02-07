import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLoanRequestHistoryComponent } from './users-loan-request-history.component';

describe('UsersLoanRequestHistoryComponent', () => {
  let component: UsersLoanRequestHistoryComponent;
  let fixture: ComponentFixture<UsersLoanRequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersLoanRequestHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersLoanRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
