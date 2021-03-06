import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {flatMap, startWith} from 'rxjs/operators';
import {of} from 'rxjs';
import {PokemonService} from 'app/services/pokemon.service';
import {InputService} from 'app/search/input/input.service';
import {PokemonWithPictureUrl} from 'app/search/input/input.model';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [InputService]
})
export class InputComponent implements OnInit {
  filteredPokemon: Observable<PokemonWithPictureUrl[]>;
  myControl = new FormControl();

  constructor(private pokemonService: PokemonService, private inputService: InputService, private router: Router) {
  }

  ngOnInit() {
    this.pokemonService.getPokemonNameList(true)
      .map(result => result.results)
      .map(pokemons => pokemons.map(p => this.inputService.pokemonToPokemonWithPng(p)))
      .subscribe(allPokemon => {
          this.filteredPokemon = this.myControl.valueChanges
            .pipe(
              startWith(''),
              flatMap(state => state ? this._filterPokemon(state) : of(allPokemon))
            );
        }
      );
  }

  public onOptionClick(pokemon: PokemonWithPictureUrl) {
    this.router.navigate(['/search', pokemon.name]);
  }

  private _filterPokemon(value: string): Observable<PokemonWithPictureUrl[]> {
    const filterValue = value.toLowerCase();

    return this.pokemonService.getPokemonNameList()
      .map(pokemons => pokemons.results.map(p => this.inputService.pokemonToPokemonWithPng(p)))
      .map(allPokemon => allPokemon.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0));
  }
}
