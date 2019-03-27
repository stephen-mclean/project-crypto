import { TestBed } from '@angular/core/testing';

import { FavouritesService } from './favourites.service';

describe('FavouritesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavouritesService = TestBed.get(FavouritesService);
    expect(service).toBeTruthy();
  });
});
