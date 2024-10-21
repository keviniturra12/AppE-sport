import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserC } from '../common/interface/users';
import { FirestoreService } from '../common/service/firestore.service';
import { AuthService } from '../common/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  user: UserC;
  selectedSegment: string = '';  // Nueva propiedad para manejar el segmento

  constructor(
    private navCtrl: NavController,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router
  ) {}

  async logOut(): Promise<void> {
    console.log('Cerrando sesión, eliminando datos de localStorage');
    localStorage.removeItem('user');
    console.log('Datos de usuario eliminados de localStorage');
    await this.authService.logOut();
    this.router.navigateByUrl('/login');
    
  }

  goToPage(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  loadusers() {
    const storedUserEmail = localStorage.getItem('userEmail');
    this.firestoreService.getCollectionChanges<UserC>('usuarios').subscribe(data => {
      console.log(data);
      if (data && data.length > 0) {
        const user = data.find(u => u.email === storedUserEmail);
        if (user) {
          this.user = user;
          console.log('Usuario cargado:', this.user);
        } else {
          console.log('No se encontró un usuario con ese email');
        }
      } else {
        console.log('No se encontraron usuarios en Firestore');
      }
    });
  }

  ngOnInit() {
    this.loadusers();
    const storedUserEmail = localStorage.getItem('userEmail');
    console.log('Email guardado en localStorage:', storedUserEmail);

    if (storedUserEmail) {
      this.firestoreService.getCollectionChanges<UserC>('usuarios').subscribe(data => {
        console.log('Datos obtenidos de Firestore:', data);
        if (data && data.length > 0) {
          const user = data.find(u => u.email === storedUserEmail);
          if (user) {
            this.user = user;
            console.log('Usuario encontrado:', this.user);
          } else {
            console.log('No se encontró un usuario con ese email');
          }
        } else {
          console.log('No se encontraron usuarios en Firestore');
        }
      });
    } else {
      console.log('No se encontró email en localStorage');
    }
  }
}
