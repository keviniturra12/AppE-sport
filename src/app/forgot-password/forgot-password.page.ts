import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage {
  forgotPasswordForm: FormGroup;
  private audio: HTMLAudioElement;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
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
