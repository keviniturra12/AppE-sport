import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserC } from '../common/interface/users';
import { FirestoreService } from '../common/service/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  users: UserC[] = [];

  constructor(private navCtrl: NavController, private firestoreService:FirestoreService) {}

  goToPage(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  loadusers() {
    this.firestoreService.getCollectionChanges<UserC>('usuarios').subscribe(data => {
      console.log(data);  // Verifica si los datos llegan correctamente
      if (data) {
        this.users = data;
      }
    });
  }

  ngOnInit() {
    this.loadusers();
  }

}
