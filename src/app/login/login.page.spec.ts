import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { IonicModule, ToastController } from '@ionic/angular';
import { LoginPage } from './login.page';
import { AuthService } from '../common/service/auth.service';
import { FirestoreService } from '../common/service/firestore.service';

// Mocks para servicios
class MockAuthService {
  logInWithEmailAndPassword(credentials: { email: string; password: string }) {
    return Promise.resolve({
      user: { email: credentials.email },
    });
  }
}

class MockFirestoreService {
  createIdDoc() {
    return 'mockId';
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockAuthService: MockAuthService;
  let mockSnackBar: MatSnackBar;

  beforeEach(async () => {
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']); // Mock de MatSnackBar
    mockAuthService = new MockAuthService();

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        IonicModule.forRoot(),
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: FirestoreService, useClass: MockFirestoreService },
        { provide: MatSnackBar, useValue: mockSnackBar }, // Mock de MatSnackBar
        ToastController,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar el método logIn
  it('should log in successfully and call authService and snackBar', async () => {
    spyOn(mockAuthService, 'logInWithEmailAndPassword').and.callThrough();

    component.newUser.email = 'test@example.com';
    component.newUser.password = 'password123';

    await component.logIn();

    // Verifica que el método del servicio de autenticación fue llamado con las credenciales correctas
    expect(mockAuthService.logInWithEmailAndPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    // Verifica que el método open de MatSnackBar fue llamado
    expect(mockSnackBar.open).toHaveBeenCalledWith('Log In Realizado', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  });

  // Prueba para verificar el método togglePasswordVisibility
  it('should toggle password visibility', () => {
    expect(component.passwordType).toBe('password'); // Valor inicial
    expect(component.passwordIcon).toBe('eye-off'); // Valor inicial

    component.togglePasswordVisibility();
    expect(component.passwordType).toBe('text'); // Cambia a texto
    expect(component.passwordIcon).toBe('eye'); // Cambia a ojo abierto

    component.togglePasswordVisibility();
    expect(component.passwordType).toBe('password'); // Cambia de nuevo a contraseña
    expect(component.passwordIcon).toBe('eye-off'); // Cambia de nuevo a ojo cerrado
  });
});
