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
  selectedSegment: string = '';  
  currentPokemon: string = ''; // Para almacenar el Pokémon actual
  isPokemonDisplayed: boolean = false; // Bandera para controlar si el Pokémon ya fue mostrado

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

  // Función para manejar el clic en "Ver mi Pokémon"
  onPokemonButtonClick() {
    if (!this.isPokemonDisplayed) {
      this.selectedSegment = 'pokemon'; // Mostrar el Pokémon la primera vez
      this.getRandomPokemon(); // Obtener un Pokémon aleatorio
      this.isPokemonDisplayed = true; // Cambiar la bandera para indicar que el Pokémon ya fue mostrado
    } else {
      this.savePokemon(); // Guardar el Pokémon si ya se ha mostrado
      this.isPokemonDisplayed = false; // Reiniciar la bandera para la próxima vez
    }
  }

  // Función para obtener un Pokémon aleatorio
  getRandomPokemon() {
    const pokemonList = ['Pikachu', 'Charmander', 'Bulbasaur', 'Squirtle', 'Jigglypuff']; // Lista de ejemplo
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    this.currentPokemon = pokemonList[randomIndex]; // Actualizar con un nuevo Pokémon
    console.log('Pokémon aleatorio obtenido:', this.currentPokemon);
  }

  // Función para guardar el Pokémon actual
  savePokemon() {
    console.log('Guardando el Pokémon:', this.currentPokemon);
    // Aquí puedes implementar la lógica de guardado (ej. en Firebase, LocalStorage, etc.)
    // Ejemplo: guardarlo en localStorage
    localStorage.setItem('savedPokemon', JSON.stringify(this.currentPokemon));
  }
}
