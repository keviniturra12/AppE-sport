import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) {}

  async register() {
    // Aquí puedes recolectar los datos del formulario, por ahora usaremos datos ficticios.
    const userData = {
      rut: '12345678-9',
      nombres: 'Juan',
      apellidos: 'Pérez',
      fechaNacimiento: '01/01/2000',
      correo: 'juan.perez@example.com',
      contrasena: 'password123'
    };

    // Guardar los datos en localStorage (esto es solo para propósitos demostrativos).
    localStorage.setItem('userData', JSON.stringify(userData));

    // Mostrar una notificación de éxito.
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Usuario registrado correctamente.',
      buttons: ['OK']
    });

    await alert.present();

    // Navegar de vuelta al login.
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
