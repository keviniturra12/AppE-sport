import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';
import { MusicMenuService } from '../common/service/music-menu.service'; // Importar servicio de música
import { AlertController } from '@ionic/angular'; // Importar el controlador de alertas


@Component({
  selector: 'app-categoria2',
  templateUrl: './categoria2.page.html',
  styleUrls: ['./categoria2.page.scss'],
})
export class Categoria2Page implements OnInit {

  constructor(private router: Router, private authService: AuthService,private musicmenuService: MusicMenuService,private alertController: AlertController) { }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]); // Navegar a la página seleccionada
  }
  

  async logOut(): Promise<void> {
    this.musicmenuService.stopMusic();
    console.log('Cerrando sesión, eliminando datos de localStorage');
    localStorage.removeItem('user');
    console.log('Datos de usuario eliminados de localStorage');
    await this.authService.logOut();
    this.router.navigateByUrl('/login');
  }


  async confirmLogOut(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-cancel-button',
        },
        {
          text: 'Salir',
          cssClass: 'alert-confirm-button',
          handler: () => {
            this.logOut(); // Llamar al método de logout si se confirma
          },
        },
      ],
    });

    await alert.present();
  }



  ngOnInit() {this.musicmenuService.playMusic(); // Asegura que la música siga sonando
  }

}
