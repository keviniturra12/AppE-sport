import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';

describe('authGuard', () => {
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      authState$: of({ email: 'test@example.com' }), // Usuario simulado siempre autenticado
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('debería permitir el acceso si el usuario está autenticado', async () => {
    // Aseguramos que authState$ devuelva un usuario simulado
    authServiceMock.authState$ = of({ email: 'test@example.com' });

    const canActivate = await authGuard({} as any, {} as any);

    expect(canActivate).toBeTrue(); // Simula que el acceso es permitido
    expect(routerMock.navigate).not.toHaveBeenCalled(); // No debería redirigir
  });

  it('debería redirigir al login si el usuario no está autenticado', async () => {
    // Aseguramos que authState$ devuelva null (usuario no autenticado)
    authServiceMock.authState$ = of(null);

    const canActivate = await authGuard({} as any, {} as any);

    expect(canActivate).toBeFalse(); // Simula que el acceso no es permitido
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']); // Verifica la redirección
  });

  it('should be created', () => {
    expect(authGuard).toBeDefined(); // Verifica que el guard está definido
  });
});
