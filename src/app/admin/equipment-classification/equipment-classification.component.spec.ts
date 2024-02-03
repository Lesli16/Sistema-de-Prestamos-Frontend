import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentClassificationComponent } from './equipment-classification.component';

describe('EquipmentClassificationComponent', () => {
  let component: EquipmentClassificationComponent;
  let fixture: ComponentFixture<EquipmentClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
