import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar para el formulario reactivo
import { UserC, AuthInterface } from '../common/interface/users';
import { FirestoreService } from '../common/service/firestore.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../common/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';
import { MusicService } from '../common/service/music.service'; // Importar servicio de música

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  newUser: UserC;
  newAuth: AuthInterface;
  cargando: boolean = false;
  registerForm: FormGroup; // Nuevo formulario reactivo

  constructor(
    private router: Router,
    private fb: FormBuilder, // FormBuilder para inicializar el formulario reactivo
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private toastController: ToastController,
    private snackBar: MatSnackBar,
    private musicService: MusicService // Inyectar el servicio de música
  ) {
    // Inicializar el formulario reactivo
    this.registerForm = this.fb.group({
      rut: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  // Getters para los campos del formulario
  get rut() {
    return this.registerForm.get('rut');
  }

  get nombres() {
    return this.registerForm.get('nombres');
  }

  get apellidos() {
    return this.registerForm.get('apellidos');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  async registro() {
    if (this.registerForm.valid) {
      // Lógica original de registro
      console.log('Formulario válido, registrando usuario...');
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
    } else {
      console.error('Formulario inválido');
    }
  }

  async save() {
    // Lógica original de save
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

  async signUp() {
    // Lógica original de signUp
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

  openSnackBar() {
    return this.snackBar.open('Log In Realizado', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  ngOnInit() {
    // Lógica original de inicialización
    this.initUser();
    this.initAuth();

    Keyboard.setStyle({ style: KeyboardStyle.Dark }); // Configuración del teclado
    this.musicService.playMusic(); // Asegura que la música siga sonando
  }

  initUser() {
    // Lógica original para inicializar newUser
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
    // Lógica original para inicializar newAuth
    this.newAuth = {
      email: null,
      password: null,
    };
  }
}
