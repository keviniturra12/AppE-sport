import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('Guard ejecutado'); // Verifica que el guard se está llamando

  const authService = inject(AuthService);
  const router = inject(Router);
  const authStateObs$ = authService.authState$;

  return authStateObs$.pipe(
    map((user) => {
      console.log('Usuario autenticado:', user); // Verifica el estado del usuario
      if (!user) {
        console.log('Redirigiendo a /login'); // Confirmación de redirección
        router.navigateByUrl('/login');
        return false; // Devuelve false si el guard no se debe activar
      }
      return true; // Devuelve true si el usuario está autenticado
    })
  );
};