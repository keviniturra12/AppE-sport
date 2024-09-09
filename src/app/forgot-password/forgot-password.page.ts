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
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(8)]], // Validar que el campo no esté vacío y tenga un mínimo de 8 caracteres
      newPassword: ['', [Validators.required, Validators.minLength(8)]], // Validar que la nueva contraseña tenga al menos 8 caracteres
      confirmPassword: ['', [Validators.required]] // Confirmar que la contraseña no esté vacía
    }, {
      validator: this.matchingPasswords('newPassword', 'confirmPassword') // Validar que las contraseñas coincidan
    });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const confirmPasswordInput = group.controls[confirmPasswordKey];
      if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setErrors({ notEquivalent: true });
      } else {
        confirmPasswordInput.setErrors(null);
      }
    };
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async resetPassword() {
    // Validamos solo que los campos estén completos y el formato sea correcto
    if (this.forgotPasswordForm.valid) {
      // Mostrar el mensaje de éxito
      const toast = await this.toastController.create({
        message: 'Contraseña restablecida correctamente',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
      
      // Redirigir al login
      this.router.navigate(['/login']);
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos correctamente.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    }
  }
}
