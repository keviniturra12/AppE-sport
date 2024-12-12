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
import { MusicService } from '../common/service/music.service'; // Importar servicio de música
import { Haptics, ImpactStyle } from '@capacitor/haptics';


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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private snackBar: MatSnackBar,
    private musicService: MusicService // Inyectar el servicio de música
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async logIn(): Promise<void> {
    this.musicService.stopMusic();
    const credentials = {
      email: this.newUser.email,
      password: this.newUser.password,
    };
    console.log('Credenciales para Ingreso:', credentials);
    try {
      const userCredential = await this.authService.logInWithEmailAndPassword(credentials);
      localStorage.setItem('userEmail', userCredential.user.email);
      console.log('Email guardado en localStorage:', userCredential.user.email);
  
      // Generar vibración ligera al verificar el usuario correctamente
      await Haptics.impact({ style: ImpactStyle.Medium });
  
      const snackBarRef = this.openSnackBar();
      snackBarRef.afterDismissed().subscribe(() => {
        this.musicService.stopMusic(); // Detener la música al ingresar un usuario válido
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
    this.musicService.playMusic(); // Asegura que la música siga sonando
  }
}
