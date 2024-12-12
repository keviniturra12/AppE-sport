import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-error-carga',
  templateUrl: './error-carga.page.html',
  styleUrls: ['./error-carga.page.scss'],
})
export class ErrorCargaPage {
  @ViewChild('animationContainer', { read: ElementRef }) animationContainer!: ElementRef;

  constructor(private animationCtrl: AnimationController) {}

  ngAfterViewInit() {
    this.playAnimation();
  }

  playAnimation() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.animationContainer.nativeElement)
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.1)', opacity: '0.8' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    animation.play();
  }

  retry() {
    // Aquí puedes implementar la lógica para reintentar la acción
    console.log('Reintentando cargar...');
  }
}
