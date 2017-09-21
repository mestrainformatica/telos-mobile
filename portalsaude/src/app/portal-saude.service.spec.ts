import { TestBed, inject } from '@angular/core/testing';

import { PortalSaudeService } from './portal-saude.service';

describe('PortalSaudeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortalSaudeService]
    });
  });

  it('should be created', inject([PortalSaudeService], (service: PortalSaudeService) => {
    expect(service).toBeTruthy();
  }));
});
