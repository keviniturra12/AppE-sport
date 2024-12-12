import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserC } from '../common/interface/users';
import { FirestoreService } from '../common/service/firestore.service';
import { AuthService } from '../common/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: UserC;
  selectedSegment: string = '';  
  currentPokemon: string = ''; // Para almacenar el Pokémon actual
  isPokemonDisplayed: boolean = false; // Bandera para controlar si el Pokémon ya fue mostrado

  // Nuevas propiedades para NavigationExtras
  errorCode: string | null = null;
  retry: boolean | null = null;

  constructor(
    private navCtrl: NavController,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute // Inyección para leer parámetros
  ) {}

  async logOut(): Promise<void> {
    console.log('Cerrando sesión, eliminando datos de localStorage');
    localStorage.removeItem('user');
    console.log('Datos de usuario eliminados de localStorage');
    await this.authService.logOut();
    this.router.navigateByUrl('/login');
  }


  navigateTo(page: string) {
    this.router.navigate([`/${page}`]); // Navegar a la página seleccionada
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

    // Recuperar NavigationExtras
    this.route.queryParams.subscribe((params) => {
      console.log('Query Params:', params);
      this.errorCode = params['errorCode'];
      this.retry = params['retry'];
    });

    this.route.fragment.subscribe((fragment) => {
      console.log('Fragment:', fragment);
    });

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
