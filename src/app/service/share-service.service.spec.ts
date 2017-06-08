/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShareServiceService } from './share-service.service';

describe('ShareServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareServiceService]
    });
  });

  it('should ...', inject([ShareServiceService], (service: ShareServiceService) => {
    expect(service).toBeTruthy();
  }));
});
