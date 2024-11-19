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

  it('should be created', () => {
    expect(authGuard).toBeDefined(); // Verifica que el guard está definido
  });
});