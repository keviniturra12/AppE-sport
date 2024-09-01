import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPasswordForm!: FormGroup; // Usando el operador de aserción de no-null

  constructor(private formBuilder: FormBuilder, private toastController: ToastController) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.matchingPasswords('newPassword', 'confirmPassword')
    });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let confirmPasswordInput = group.controls[confirmPasswordKey];
      if (passwordInput.value !== confirmPasswordInput.value) {
        return confirmPasswordInput.setErrors({notEquivalent: true});
      } else {
        return confirmPasswordInput.setErrors(null);
      }
    };
  }

  async resetPassword() {
    if (this.forgotPasswordForm.valid) {
      const toast = await this.toastController.create({
        message: 'Contraseña restablecida correctamente',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
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
