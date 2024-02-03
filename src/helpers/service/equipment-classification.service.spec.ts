import { TestBed } from '@angular/core/testing';

import { EquipmentClassificationService } from './equipment-classification.service';

describe('EquipmentClassificationService', () => {
  let service: EquipmentClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
