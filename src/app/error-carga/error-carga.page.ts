import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-carga',
  templateUrl: './error-carga.page.html',
  styleUrls: ['./error-carga.page.scss'],
})
export class ErrorCargaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  retry() {
    console.log('Reintentando la carga...');
    // Aquí puedes colocar la lógica de reintento
  }
}
