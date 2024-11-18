import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard'; // Ruta relativa desde el archivo
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Ruta relativa al AuthService

describe('authGuard', () => {
  let routerMock: any;
  let authServiceMock: any;

  beforeEach(() => {
    // Crear mocks
    authServiceMock = {
      authState$: jasmine.createSpy('authState$').and.returnValue(Promise.resolve(true)), // Usuario autenticado
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Configurar el módulo de prueba
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  // Test base que viene por defecto
  it('should be created', () => {
    expect(authGuard).toBeDefined();
  });

  // Test adicional: verificar acceso autenticado
  it('debería permitir el acceso si el usuario está autenticado', async () => {
    authServiceMock.authState$.and.returnValue(Promise.resolve(true)); // Simula usuario autenticado
    const canActivate = await authGuard({} as any, {} as any); // Llama al guard directamente
    expect(canActivate).toBeTrue(); // Verifica que permite el acceso
  });

  // Test adicional: verificar redirección para no autenticado
  it('debería redirigir al login si el usuario no está autenticado', async () => {
    authServiceMock.authState$.and.returnValue(Promise.resolve(false)); // Simula usuario no autenticado
    const canActivate = await authGuard({} as any, {} as any); // Llama al guard directamente
    expect(canActivate).toBeFalse(); // Verifica que bloquea el acceso
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']); // Verifica redirección al login
  });
});
