import { TestBed, async, inject } from '@angular/core/testing';

import { OnboardGuard } from './onboard.guard';

describe('OnboardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnboardGuard]
    });
  });

  it('should ...', inject([OnboardGuard], (guard: OnboardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
