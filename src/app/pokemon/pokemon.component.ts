import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon: any;
  loading: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRandomPokemon();
  }

  getRandomPokemon(): void {
    const randomId = Math.floor(Math.random() * 898) + 1; // ID aleatorio entre 1 y 898
    this.loading = true;
    this.apiService.getPokemon(randomId).subscribe(data => {
      this.pokemon = data;
      this.loading = false;
    });
  }
}
