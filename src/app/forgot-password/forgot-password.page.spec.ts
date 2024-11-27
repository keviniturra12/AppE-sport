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



  it('debería inicializar el formulario correctamente', () => {
    expect(component.forgotPasswordForm.contains('email')).toBeTrue();
    expect(component.forgotPasswordForm.contains('newPassword')).toBeTrue();
    expect(component.forgotPasswordForm.contains('confirmPassword')).toBeTrue();
  });
});
