import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ErrorCargaPage } from './error-carga.page';

describe('Página ErrorCargaPage', () => {
  let component: ErrorCargaPage;
  let fixture: ComponentFixture<ErrorCargaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorCargaPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorCargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar un mensaje de error', () => {
    const compiled = fixture.nativeElement;
    const mensajeError = compiled.querySelector('.error-message');
    expect(mensajeError).toBeTruthy();
    expect(mensajeError.textContent).toContain('Lo sentimos, la página que buscas no existe.');
  });

});
