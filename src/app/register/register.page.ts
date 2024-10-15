import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserC } from '../common/interface/users';
import { FirestoreService } from '../common/service/firestore.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUser: UserC;
  cargando: boolean = false;

  constructor(private router: Router, private alertController: AlertController,private firestoreService:FirestoreService,private toastController:ToastController) {}

  async save() {
    this.cargando = true;
    try {
      await this.firestoreService.createDocumentID(this.newUser, 'usuarios', this.newUser.id);
      
      // Muestra el mensaje de éxito con ToastController
      const toast = await this.toastController.create({
        message: 'Usuario registrado exitosamente',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
  
      // Redirige al usuario a la página de login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar usuario: ', error);
    } finally {
      this.cargando = false;
    }
  }

  initUser(){
    this.newUser = {
      rut:null,
      nombres:null,
      apellidos:null,
      correo: null,
      contrasena: null,
      id: this.firestoreService.createIdDoc(),
    }
  }

  ngOnInit() {
    this.initUser();
  }

}
