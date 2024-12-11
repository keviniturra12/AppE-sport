import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';
import { MusicService } from '../common/service/music.service'; // Importar servicio de música

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private musicService: MusicService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  get newPassword() {
    return this.forgotPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.forgotPasswordForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log('Form Submitted:', this.forgotPasswordForm.value);
    }
  }

  ngOnInit() {
    Keyboard.setStyle({ style: KeyboardStyle.Dark }); // Configuración del teclado
    this.musicService.playMusic(); // Asegura que la música siga sonando
  }
}
