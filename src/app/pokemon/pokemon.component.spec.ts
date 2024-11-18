import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonComponent } from './pokemon.component';
import { ApiService } from '../servicios/api.service';// Asegúrate de ajustar la ruta del servicio
import { of } from 'rxjs';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getPokemon']);

    await TestBed.configureTestingModule({
      declarations: [PokemonComponent],
      providers: [
        { provide: ApiService, useValue: spy }
      ]
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;

    // Simulación de respuesta de la API
    const mockPokemon = {
      id: 1,
      name: 'bulbasaur',
      weight: 69,
      height: 7,
      sprites: { front_default: 'https://url-de-imagen.com' },
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
    };
    apiServiceSpy.getPokemon.and.returnValue(of(mockPokemon));

    fixture.detectChanges();
  });

  // Prueba que viene por defecto
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al método getRandomPokemon y obtener un Pokémon', () => {
    component.getRandomPokemon();
    fixture.detectChanges();

    expect(apiServiceSpy.getPokemon).toHaveBeenCalled();
    expect(component.pokemon).toEqual({
      id: 1,
      name: 'bulbasaur',
      weight: 69,
      height: 7,
      sprites: { front_default: 'https://url-de-imagen.com' },
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
    });
  });
});
