import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../common/service/firestore.service';
import { AuthService } from '../common/service/auth.service';
import { UserC } from '../common/interface/users';
import { ApiService } from '../servicios/api.service';
import { Router} from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { MusicMenuService } from '../common/service/music-menu.service'; // Importar servicio de música
import { AlertController } from '@ionic/angular'; // Importar el controlador de alertas


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: UserC;
  isLoading: boolean = true; // Bandera para controlar el estado de carga
  pokemon: any = null; // Objeto para almacenar el Pokémon actual
  currentPokemon: string = 'eevee'; // Pokémon predeterminado
  isPokemonDisplayed: boolean = false; // Bandera para controlar si el Pokémon ya fue mostrado

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private musicmenuService: MusicMenuService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUserProfile();
    this.loadDefaultPokemon();
  }


  async confirmLogOut(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-cancel-button',
        },
        {
          text: 'Salir',
          cssClass: 'alert-confirm-button',
          handler: () => {
            this.logOut(); // Llamar al método de logout si se confirma
          },
        },
      ],
    });

    await alert.present();
  }

  async loadUserProfile() {
    this.isLoading = true; // Comienza la carga
    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedUserEmail) {
      this.firestoreService
        .getCollectionChanges<UserC>('usuarios')
        .subscribe((data) => {
          const user = data.find((u) => u.email === storedUserEmail);
          if (user) {
            this.user = user;
          }
          this.isLoading = false; // Termina la carga
        });
    } else {
      this.isLoading = false; // Si no hay email, también termina la carga
    }
  }

  // Cargar un Pokémon predeterminado al iniciar
  loadDefaultPokemon(): void {
    this.apiService.getPokemonByName(this.currentPokemon).subscribe(
      (data) => {
        this.pokemon = data; // Asignar los datos de Eevee
        console.log('Pokémon predeterminado cargado:', this.pokemon);
      },
      (error) => {
        console.error('Error al cargar el Pokémon predeterminado:', error);
      }
    );
  }


// Función para obtener un Pokémon aleatorio
getRandomPokemon(): void {
  const randomId = Math.floor(Math.random() * 898) + 1; // Generar un ID aleatorio entre 1 y 898

  // Disparar vibración usando Haptics
  Haptics.impact({
    style: ImpactStyle.Heavy, // Puedes cambiar a Medium o Light según prefieras
  });

  this.apiService.getPokemon(randomId).subscribe(
    (data) => {
      this.pokemon = data; // Asignar los datos del Pokémon
      console.log('Detalles del Pokémon aleatorio:', this.pokemon);
    },
    (error) => {
      console.error('Error al obtener Pokémon aleatorio:', error);
    }
  );
}

  // Función para buscar un Pokémon por nombre
  searchPokemon(): void {
    const pokemonName = prompt('Introduce el nombre del Pokémon:').toLowerCase(); // Solicita el nombre al usuario
    if (pokemonName) {
      this.apiService.getPokemonByName(pokemonName).subscribe(
        (data) => {
          this.pokemon = data; // Asignar los datos del Pokémon
          this.currentPokemon = pokemonName; // Actualizar el nombre actual
          console.log('Detalles del Pokémon buscado:', this.pokemon);
        },
        (error) => {
          alert('Pokémon no encontrado. Intenta de nuevo.');
        }
      );
    }
  }

  async logOut(): Promise<void> {
    this.musicmenuService.stopMusic();
    console.log('Cerrando sesión, eliminando datos de localStorage');
    localStorage.removeItem('user');
    console.log('Datos de usuario eliminados de localStorage');
    await this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]); // Navegar a la página seleccionada
  }

}
