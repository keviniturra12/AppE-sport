import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { FirestoreService } from '../common/service/firestore.service';
import { AuthService } from '../common/service/auth.service';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  // Mock para FirestoreService
  const firestoreServiceMock = {
    getCollectionChanges: jasmine.createSpy('getCollectionChanges').and.returnValue(of([]))
  };

  // Mock para AuthService
  const authServiceMock = {
    logOut: jasmine.createSpy('logOut').and.returnValue(Promise.resolve())
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});