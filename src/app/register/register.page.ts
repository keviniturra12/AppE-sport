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
  registerForm: FormGroup; // Formulario reactivo

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
      // Validar que las contraseñas coincidan
      if (this.password?.value !== this.confirmPassword?.value) {
        const toast = await this.toastController.create({
          message: 'Las contraseñas no coinciden',
          duration: 2000,
          position: 'bottom',
          color: 'danger',
        });
        await toast.present();
        return;
      }

      console.log('Formulario válido, registrando usuario...');
      // Crear usuario en Firestore
      try {
        await this.saveUserToFirestore();
      } catch (error) {
        console.error('Error al guardar el usuario en Firestore:', error);
      }

      // Registrar usuario en Firebase Authentication
      try {
        await this.createUserInFirebaseAuth();
      } catch (error) {
        console.error('Error al registrar el usuario en Firebase Authentication:', error);
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  async saveUserToFirestore() {
    this.newUser = {
      rut: this.rut?.value,
      nombres: this.nombres?.value,
      apellidos: this.apellidos?.value,
      email: this.email?.value,
      password: this.password?.value,
      id: this.firestoreService.createIdDoc(),
    };

    try {
      await this.firestoreService.createDocumentID(this.newUser, 'usuarios', this.newUser.id);
      const toast = await this.toastController.create({
        message: 'Usuario registrado exitosamente en Firestore',
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
    } catch (error) {
      console.error('Error al guardar el usuario en Firestore:', error);
      throw error;
    }
  }

  async createUserInFirebaseAuth() {
    const credentials = {
      email: this.email?.value,
      password: this.password?.value,
    };

    try {
      console.log('Intentando registrar usuario en Firebase Authentication:', credentials);
      await this.authService.signUpWithEmailAndPassword(credentials);
      const snackBarRef = this.openSnackBar();
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/login');
      });
    } catch (error) {
      console.error('Error al registrar usuario en Firebase Authentication:', error);
      throw error;
    }
  }

  openSnackBar() {
    return this.snackBar.open('Registro exitoso. Inicia sesión.', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  ngOnInit() {
    Keyboard.setStyle({ style: KeyboardStyle.Dark }); // Configuración del teclado
    this.musicService.playMusic(); // Asegura que la música siga sonando
  }
}
