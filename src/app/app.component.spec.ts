import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Prueba 1: Verificar que el componente contiene un <ion-app>
  it('debería contener un elemento <ion-app>', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;
    const ionApp = compiled.querySelector('ion-app');
    expect(ionApp).not.toBeNull();
  });

  // Prueba 2: Verificar que el componente contiene un <ion-router-outlet>
  it('debería contener un elemento <ion-router-outlet>', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;
    const routerOutlet = compiled.querySelector('ion-router-outlet');
    expect(routerOutlet).not.toBeNull();
  });

  // Prueba 3: Verificar que el componente se renderiza correctamente
  it('debería renderizar el componente correctamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled).toBeDefined();
  });
});
