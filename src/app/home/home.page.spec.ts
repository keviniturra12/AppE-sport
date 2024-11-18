import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from './home.page';
import { AuthService } from '../common/service/auth.service';
import { FirestoreService } from '../common/service/firestore.service';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let firestoreServiceSpy: jasmine.SpyObj<FirestoreService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['logOut']);
    const firestoreSpy = jasmine.createSpyObj('FirestoreService', ['getCollectionChanges']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: FirestoreService, useValue: firestoreSpy },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    firestoreServiceSpy = TestBed.inject(FirestoreService) as jasmine.SpyObj<FirestoreService>;
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    // Simula datos de usuario para las pruebas
    firestoreServiceSpy.getCollectionChanges.and.returnValue(
      of([{ email: 'test@example.com', nombres: 'Test User' }])
    );

    fixture.detectChanges();
  });

  // Prueba que viene por defecto
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 1: Verificar que se llama a logOut al presionar el botón
  it('debería llamar a logOut cuando se presiona el botón de LOG-OUT', () => {
    spyOn(component, 'logOut').and.callThrough();
    const button = fixture.nativeElement.querySelector('.logout-button');
    button.click();
    expect(component.logOut).toHaveBeenCalled();
  });

 // Prueba 2: Verificar que se llame al método del servicio para cargar usuarios
it('debería llamar al método getCollectionChanges del servicio Firestore', () => {
  component.loadusers();
  fixture.detectChanges();
  
  expect(firestoreServiceSpy.getCollectionChanges).toHaveBeenCalled(); // Verifica que el servicio fue llamado
});


  // Prueba 3: Verificar navegación al hacer clic en una categoría
  it('debería navegar a la página de categoría al hacer clic en una tarjeta', () => {
    spyOn(component, 'goToPage');
    const card = fixture.nativeElement.querySelector('ion-card');
    card.click();
    expect(component.goToPage).toHaveBeenCalled();
  });
});
