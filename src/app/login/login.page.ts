import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthInterface, UserC } from '../common/interface/users';
import { AuthService } from '../common/service/auth.service';
import { FirestoreService } from '../common/service/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('fadeSlideIn', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':enter', [animate('500ms ease-out')]),
    ]),
  ],
})
export class LoginPage {
  loginForm: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  newUser: UserC;
  newAuth: AuthInterface;
  private audio: HTMLAudioElement;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async logIn(): Promise<void> {
    const credentials = {
      email: this.newUser.email,
      password: this.newUser.password,
    };
    console.log('Credenciales para Ingreso:', credentials);
    try {
      const userCredential = await this.authService.logInWithEmailAndPassword(credentials);
      localStorage.setItem('userEmail', userCredential.user.email);
      console.log('Email guardado en localStorage:', userCredential.user.email);
      const snackBarRef = this.openSnackBar();
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }

  openSnackBar() {
    return this.snackBar.open('Log In Realizado', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
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
