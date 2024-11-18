import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Categoria4Page } from './categoria4.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('Categoria4Page', () => {
  let component: Categoria4Page;
  let fixture: ComponentFixture<Categoria4Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Categoria4Page],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Categoria4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 1: Verificar que el título de la página sea correcto
  it('debería mostrar el título correcto "Fighting Game"', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('ion-title').textContent;
    expect(title).toBe('Fighting Game');
  });

  // Prueba 2: Verificar la cantidad de tarjetas de juegos
  it('debería mostrar tres tarjetas de juegos', () => {
    const compiled = fixture.nativeElement;
    const cards = compiled.querySelectorAll('ion-card');
    expect(cards.length).toBe(3);
  });

  // Prueba 3: Verificar que el botón de volver a categorías tiene el enlace correcto
  it('debería tener un botón de volver con el enlace a /home', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('ion-button');
    expect(button.getAttribute('ng-reflect-router-link')).toBe('/home');
  });
});
