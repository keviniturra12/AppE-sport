import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // Definimos la propiedad fecha_nacimiento como un objeto Date
  fecha_nacimiento: Date = new Date();


  constructor(private router: Router, private alertController: AlertController) {}

  async register() {
    // Aquí recolectamos los datos del formulario incluyendo la fecha de nacimiento.
    const userData = {
      rut: '12345678-9',
      nombres: 'Juan',
      apellidos: 'Pérez',
      fechaNacimiento: this.fecha_nacimiento, // Utilizamos la fecha de nacimiento seleccionada
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
