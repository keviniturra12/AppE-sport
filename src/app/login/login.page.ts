import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importamos ToastController
import { AuthInterface, UserC } from '../common/interface/users';
import { AuthService } from '../common/service/auth.service';
import { FirestoreService } from '../common/service/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  passwordType: string = 'password'; // Inicialización para tipo de input de la contraseña
  passwordIcon: string = 'eye-off'; // Inicialización para el icono
  newUser: UserC;
  newAuth: AuthInterface;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private toastController: ToastController,
    private authService: AuthService,
    private firestoreService:FirestoreService, 
    private snackBar: MatSnackBar) {
    
      // Inicializa el formulario con validaciones
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async logIn(): Promise<void>{
    const credentials = {
      email: this.newUser.email,
      password: this.newUser.password,
    };
    console.log('Credenciales para Ingreso:', credentials);
    try {
      const userCredential = await this.authService.logInWithEmailAndPassword(credentials);
      localStorage.setItem('userEmail', userCredential.user.email);
      console.log('Email guardado en localStorage:', userCredential.user.email);
      const snackBarRef = this.openSnackBar(); // Abre el SnackBar
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/home'); // Navega a la página de inicio después de cerrar el SnackBar
      });
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }

  openSnackBar(){
    return this.snackBar.open('Log In Realizado','Close',{
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // Métodos de conveniencia para obtener los controles del formulario
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  initUser(){
    this.newUser = {
      rut:null,
      nombres:null,
      apellidos:null,
      email: null,
      password: null,
      id: this.firestoreService.createIdDoc(),
    }
  }
  initAuth(){
    this.newAuth = {
      email: null,
      password: null,
  }
}
  

  ngOnInit() {
    this.initUser();
    this.initAuth();
    
  }
}
