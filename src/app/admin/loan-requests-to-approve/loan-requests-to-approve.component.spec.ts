import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestsToApproveComponent } from './loan-requests-to-approve.component';

describe('LoanRequestsToApproveComponent', () => {
  let component: LoanRequestsToApproveComponent;
  let fixture: ComponentFixture<LoanRequestsToApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanRequestsToApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanRequestsToApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
