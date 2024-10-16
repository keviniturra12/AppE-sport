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

  constructor(private navCtrl: NavController, private firestoreService:FirestoreService, private authService: AuthService, private router:Router) {}


  async logOut(): Promise<void> {
    console.log('Cerrando sesión, eliminando datos de localStorage'); // Verifica que se está cerrando la sesión
    localStorage.removeItem('user'); // Limpia los datos almacenados
    console.log('Datos de usuario eliminados de localStorage'); // Verifica que los datos se eliminaron correctamente
    this.router.navigateByUrl('/login');
    return this.authService.logOut();
  }
  

  goToPage(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  loadusers() {
    const storedUserEmail = localStorage.getItem('userEmail');  // Ejemplo: el email almacenado en localStorage
    this.firestoreService.getCollectionChanges<UserC>('usuarios').subscribe(data => {
      console.log(data);  // Verifica si los datos llegan correctamente
      if (data && data.length > 0) {
        const user = data.find(u => u.email === storedUserEmail);  // Busca el usuario por email
        if (user) {
          this.user = user;  // Asigna el usuario encontrado
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
    const storedUserEmail = localStorage.getItem('userEmail');  // Obtener el email desde el localStorage
  console.log('Email guardado en localStorage:', storedUserEmail);

  if (storedUserEmail) {
    // Ahora obtendremos todos los usuarios y los filtraremos en el lado del cliente
    this.firestoreService.getCollectionChanges<UserC>('usuarios').subscribe(data => {
      console.log('Datos obtenidos de Firestore:', data);
      if (data && data.length > 0) {
        // Filtramos por email en el lado del cliente
        const user = data.find(u => u.email === storedUserEmail);
        if (user) {
          this.user = user;  // Asignamos el usuario encontrado
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

  