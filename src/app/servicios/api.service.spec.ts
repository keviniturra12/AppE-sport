import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Módulo para pruebas con HttpClient
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificar que no haya solicitudes pendientes
    httpTestingController.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener un Pokémon por su ID', () => {
    const mockPokemon = { name: 'bulbasaur', id: 1 };
    const pokemonId = 1;

    service.getPokemon(pokemonId).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/pokemon/${pokemonId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon); // Simular respuesta del servidor
  });

  it('debería manejar un error al obtener un Pokémon', () => {
    const pokemonId = 9999; // ID que no existe

    service.getPokemon(pokemonId).subscribe(
      () => fail('La solicitud debería haber fallado'),
      (error) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpTestingController.expectOne(`${service['baseUrl']}/pokemon/${pokemonId}`);
    expect(req.request.method).toBe('GET');
    req.flush('No encontrado', { status: 404, statusText: 'Not Found' }); // Simular error 404
  });
});
