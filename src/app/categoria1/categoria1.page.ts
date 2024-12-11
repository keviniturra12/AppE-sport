import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';

@Component({
  selector: 'app-categoria1',
  templateUrl: './categoria1.page.html',
  styleUrls: ['./categoria1.page.scss'],
})
export class Categoria1Page implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]); // Navegar a la página seleccionada
  }
  

  async logOut(): Promise<void> {
    console.log('Cerrando sesión, eliminando datos de localStorage');
    localStorage.removeItem('user');
    console.log('Datos de usuario eliminados de localStorage');
    await this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}


