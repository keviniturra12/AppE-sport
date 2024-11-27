import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-error-carga',
  templateUrl: './error-carga.page.html',
  styleUrls: ['./error-carga.page.scss'],
})
export class ErrorCargaPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // Cualquier lógica inicial necesaria para la página de error
  }

  // Método para manejar el reintento de carga
  retry() {
    console.log('Reintentando la carga...');
    // Aquí puedes agregar lógica de reintento específica, como volver a llamar a un servicio.
    // Por ejemplo:
    // this.someService.retryLastOperation();
  }

  // Método para navegar con NavigationExtras
  navigateWithExtras() {
    const navigationExtras: NavigationExtras = {
      queryParams: { errorCode: 404, retry: true },
      fragment: 'top',
    };

    console.log('Navegando con extras:', navigationExtras);
    this.router.navigate(['/home'], navigationExtras);
  }
}
