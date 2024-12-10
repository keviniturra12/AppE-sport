import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserC, AuthInterface } from '../common/interface/users';
import { FirestoreService } from '../common/service/firestore.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../common/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  newUser: UserC;
  newAuth: AuthInterface;
  cargando: boolean = false;
  private audio: HTMLAudioElement;

  constructor(
    private router: Router,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private toastController: ToastController,
    private snackBar: MatSnackBar
  ) {}

  async registro() {
    console.log('Iniciando registro...');
    try {
      await this.save();
    } catch (error) {
      console.error('Error en save():', error);
    }
    try {
      await this.signUp();
    } catch (error) {
      console.error('Error en signUp():', error);
    }
  }

  async save() {
    this.cargando = true;
    try {
      await this.firestoreService.createDocumentID(this.newUser, 'usuarios', this.newUser.id);
      const toast = await this.toastController.create({
        message: 'Usuario registrado exitosamente',
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
    } catch (error) {
      console.error('Error al registrar usuario: ', error);
    } finally {
      this.cargando = false;
    }
  }

  openSnackBar() {
    return this.snackBar.open('Log In Realizado', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  async signUp() {
    const credentials = {
      email: this.newUser.email,
      password: this.newUser.password,
    };
    console.log('Credenciales para registro:', credentials);
    await this.authService.signUpWithEmailAndPassword(credentials);
    const snackBarRef = this.openSnackBar();
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  initUser() {
    this.newUser = {
      rut: null,
      nombres: null,
      apellidos: null,
      email: null,
      password: null,
      id: this.firestoreService.createIdDoc(),
    };
  }

  initAuth() {
    this.newAuth = {
      email: null,
      password: null,
    };
  }

  ngOnInit() {
    this.initUser();
    this.initAuth();

    Keyboard.setStyle({ style: KeyboardStyle.Dark }); // Configuración del teclado

    this.audio = new Audio('assets/audio/background.mp3'); // Configuración de la música
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.audio.play();
  }

  ngOnDestroy() {
    Keyboard.setStyle({ style: KeyboardStyle.Light }); // Restaurar estilo del teclado

    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}
