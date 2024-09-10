import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importamos ToastController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  passwordType: string = 'password'; // Inicialización para tipo de input de la contraseña
  passwordIcon: string = 'eye-off'; // Inicialización para el icono

  constructor(private fb: FormBuilder, private router: Router, private toastController: ToastController) {
    // Inicializa el formulario con validaciones
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para manejar el envío del formulario
  async onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Aquí puedes hacer una validación personalizada de usuario y contraseña
      if (username === 'admin' && password === '123456') {
        this.router.navigate(['/home']); // Redirige a la página de inicio
      } else {
        // Mostrar toast con mensaje de error
        const toast = await this.toastController.create({
          message: 'Usuario y/o contraseña incorrectos',
          duration: 2000,
          color: 'danger', // Estilo de error
          position: 'top',
        });
        toast.present();
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, completa correctamente el formulario',
        duration: 2000,
        color: 'danger',
        position: 'top',
      });
      toast.present();
    }
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
}
