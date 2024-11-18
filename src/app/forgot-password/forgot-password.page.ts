import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importamos el router para la redirección

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPasswordForm!: FormGroup;
  passwordType: string = 'password'; // Tipo de input para la contraseña
  passwordIcon: string = 'eye-off';  // Ícono por defecto (ocultar contraseña)

  constructor(
    private formBuilder: FormBuilder, 
    private toastController: ToastController,
    private router: Router // Usamos el router para la redirección
  ) {}

  ngOnInit() {
    // Configuración inicial del formulario
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Valida que el campo sea un correo válido
      newPassword: ['', [Validators.required, Validators.minLength(8)]], // Nueva contraseña debe tener al menos 8 caracteres
      confirmPassword: ['', [Validators.required]] // Confirmar que no esté vacío
    }, {
      validator: this.passwordMatchValidator // Validar que las contraseñas coincidan
    });
  }

  // Validador personalizado para comprobar si las contraseñas coinciden
  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notEquivalent: true };
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async resetPassword() {
    if (this.forgotPasswordForm.valid) {
      // Registrar valores del formulario en consola
      console.log('Formulario válido:', this.forgotPasswordForm.value);
  
      const toast = await this.toastController.create({
        message: 'Contraseña restablecida correctamente',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
  
      this.router.navigate(['/login']);
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos correctamente.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  }
  
}
