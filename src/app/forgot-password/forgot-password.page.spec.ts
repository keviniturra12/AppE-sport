import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgotPasswordPage } from './forgot-password.page';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordPage],
      imports: [
        ReactiveFormsModule,
        IonicModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar un mensaje de éxito si el formulario es válido', () => {
    component.forgotPasswordForm.setValue({
      email: 'test@example.com',
      newPassword: 'password123',
      confirmPassword: 'password123'
    });

    spyOn(console, 'log');
    component.resetPassword();
    expect(console.log).toHaveBeenCalledWith('Formulario válido:', {
      email: 'test@example.com',
      newPassword: 'password123',
      confirmPassword: 'password123'
    });
  });

  it('debería verificar que los campos de contraseña coinciden', () => {
    component.forgotPasswordForm.setValue({
      email: 'test@example.com',
      newPassword: 'password123',
      confirmPassword: 'differentPassword'
    });

    const errors = component.forgotPasswordForm.errors;
    expect(errors).toEqual({ notEquivalent: true });
  });

  it('debería inicializar el formulario correctamente', () => {
    expect(component.forgotPasswordForm.contains('email')).toBeTrue();
    expect(component.forgotPasswordForm.contains('newPassword')).toBeTrue();
    expect(component.forgotPasswordForm.contains('confirmPassword')).toBeTrue();
  });
});
