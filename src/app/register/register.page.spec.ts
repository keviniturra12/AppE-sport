import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';
import { FirestoreService } from '../common/service/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  // Mock Services
  const authServiceMock = {
    signUpWithEmailAndPassword: jasmine.createSpy('signUpWithEmailAndPassword').and.returnValue(Promise.resolve())
  };

  const firestoreServiceMock = {
    createDocumentID: jasmine.createSpy('createDocumentID').and.returnValue(Promise.resolve()),
    createIdDoc: jasmine.createSpy('createIdDoc').and.returnValue('mockId')
  };

  const toastControllerMock = {
    create: jasmine.createSpy('create').and.returnValue({
      present: jasmine.createSpy('present')
    })
  };

  const snackBarMock = {
    open: jasmine.createSpy('open').and.returnValue({
      afterDismissed: jasmine.createSpy('afterDismissed').and.returnValue({
        subscribe: jasmine.createSpy('subscribe')
      })
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: FirestoreService, useValue: firestoreServiceMock },
        { provide: ToastController, useValue: toastControllerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call save and signUp when registro is called', async () => {
    spyOn(component, 'save').and.returnValue(Promise.resolve());
    spyOn(component, 'signUp').and.returnValue(Promise.resolve());

    await component.registro();

    expect(component.save).toHaveBeenCalled();
    expect(component.signUp).toHaveBeenCalled();
  });

  it('should initialize newUser with default values', () => {
    component.initUser();
    expect(component.newUser).toEqual({
      rut: null,
      nombres: null,
      apellidos: null,
      email: null,
      password: null,
      id: 'mockId'  // Asumiendo que el ID es creado por createIdDoc()
    });
  });

  it('should initialize newAuth with default values', () => {
    component.initAuth();
    expect(component.newAuth).toEqual({
      email: null,
      password: null
    });
  });

  it('should call createDocumentID and show success toast on save', async () => {
    await component.save();

    expect(firestoreServiceMock.createDocumentID).toHaveBeenCalled();
    expect(toastControllerMock.create).toHaveBeenCalled();
    expect(toastControllerMock.create().present).toHaveBeenCalled();
  });

  it('should show SnackBar and navigate to login on successful signUp', async () => {
    await component.signUp();

    expect(snackBarMock.open).toHaveBeenCalledWith('Log In Realizado', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
    snackBarMock.open().afterDismissed().subscribe(() => {
      expect(TestBed.inject(Router).navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });
});
