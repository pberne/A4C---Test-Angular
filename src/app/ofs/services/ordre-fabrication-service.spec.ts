import { TestBed } from '@angular/core/testing';
import { OrdreFabricationService } from './ordre-fabrication-service';

describe('OrdreFabricationService', () => {
  let service: OrdreFabricationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdreFabricationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
