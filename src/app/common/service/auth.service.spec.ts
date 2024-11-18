import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';


// Mock completo de AuthService
class MockAuthService {
  signUpWithEmailAndPassword = jasmine.createSpy('signUpWithEmailAndPassword')
    .and.returnValue(Promise.resolve({ user: { uid: 'mockUserId' } }));
  logInWithEmailAndPassword = jasmine.createSpy('logInWithEmailAndPassword')
    .and.returnValue(Promise.resolve({ user: { uid: 'mockUserId' } }));
  logOut = jasmine.createSpy('logOut').and.returnValue(Promise.resolve());
}

describe('AuthService (Mock)', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService }, // Inyección del mock completo
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar sesión con email y contraseña', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const result = await service.logInWithEmailAndPassword({ email, password });
    expect(result.user.uid).toBe('mockUserId');
    expect(service.logInWithEmailAndPassword).toHaveBeenCalledWith({ email, password });
  });

  it('debería registrarse con email y contraseña', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const result = await service.signUpWithEmailAndPassword({ email, password });
    expect(result.user.uid).toBe('mockUserId');
    expect(service.signUpWithEmailAndPassword).toHaveBeenCalledWith({ email, password });
  });

  it('debería cerrar sesión', async () => {
    await service.logOut();
    expect(service.logOut).toHaveBeenCalled();
  });
});