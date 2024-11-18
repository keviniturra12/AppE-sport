import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore'; // Asegúrate de tener la dependencia instalada
import { FirestoreService } from './firestore.service';

describe('FirestoreService', () => {
  let service: FirestoreService;

  // Mock de Firestore
  const mockFirestore = {
    collection: jasmine.createSpy('collection').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue([]),
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirestoreService,
        { provide: Firestore, useValue: mockFirestore }, // Simula Firestore
      ],
    });
    service = TestBed.inject(FirestoreService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });
});