import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserC, AuthInterface } from '../common/interface/users';
import { FirestoreService } from '../common/service/firestore.service';
import { ToastController } from '@ionic/angular';
import { AuthService,  } from '../common/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUser: UserC;
  newAuth: AuthInterface;
  cargando: boolean = false;

  constructor(private router: Router, private authService: AuthService,private firestoreService:FirestoreService,private toastController:ToastController,private snackBar: MatSnackBar) {}


  async registro() {
    console.log('Iniciando registro...');
  
    try {
      console.log('Llamando a save()...');
      await this.save();
      console.log('save() ejecutado con éxito.');
    } catch (error) {
      console.error('Error en save():', error);
    }
  
    try {
      console.log('Llamando a signUp()...');
      await this.signUp();
      console.log('signUp() ejecutado con éxito.');
    } catch (error) {
      console.error('Error en signUp():', error);
    }
  
    console.log('Finalizando registro...');
  }

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
    } catch (error) {
      console.error('Error al registrar usuario: ', error);
    } finally {
      this.cargando = false;
    }
  }

  openSnackBar(){
    return this.snackBar.open('Log In Realizado','Close',{
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  async signUp(){
    const credentials = {
      email: this.newUser.email,
      password: this.newUser.password,
    };
    console.log('Credenciales para registro:', credentials);
    await this.authService.signUpWithEmailAndPassword(credentials);
    const snackBarRef = this.openSnackBar() // Abre el SnackBar
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/login'); // Navega a la página de inicio después de cerrar el SnackBar
      });
  }
  

  

  initUser(){
    this.newUser = {
      rut:null,
      nombres:null,
      apellidos:null,
      email: null,
      password: null,
      id: this.firestoreService.createIdDoc(),
    }
  }
  initAuth(){
    this.newAuth = {
      email: null,
      password: null,
  }
}
  


  ngOnInit() {
    this.initUser();
    this.initAuth();
  }

}
