import { TestBed } from '@angular/core/testing';

import { EquipmentSelectionService } from './equipment-selection.service';

describe('EquipmentSelectionService', () => {
  let service: EquipmentSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
