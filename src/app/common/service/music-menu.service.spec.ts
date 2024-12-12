import { TestBed } from '@angular/core/testing';

import { MusicMenuService } from './music-menu.service';

describe('MusicMenuService', () => {
  let service: MusicMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
