import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicMenuService {
  private audio: HTMLAudioElement;
  private isPlaying: boolean = false;

  constructor() {
    this.audio = new Audio('assets/audio/menu.mp3'); // Ruta del archivo de música
    this.audio.loop = true; // Habilitar loop
    this.audio.volume = 0.5;
  }

  playMusic() {
    if (!this.isPlaying) {
      this.audio.play().then(() => {
        this.isPlaying = true;
        console.log('Música iniciada');
      }).catch((err) => {
        console.error('Error al reproducir música:', err);
      });
    }
  }

  stopMusic() {
    if (this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0; // Reiniciar al inicio
      this.isPlaying = false;
      console.log('Música detenida');
    }
  }
}
