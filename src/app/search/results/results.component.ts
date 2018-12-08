import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SearchService} from 'app/search/search.service';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;
import 'rxjs-compat/add/operator/share';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
  @Input() query: String;
  private pokemonResult: Array<PokemonWithAllProperties>;

  constructor(private searchService: SearchService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const observable = this.searchService.search(this.query).share();
    observable.subscribe(result => this.pokemonResult = result);
    observable.subscribe(console.log.bind(this));
  }

  getPokemonTypes(pokemon: Pokemon.PokemonWithAllProperties): string {
    return pokemon.types.map(t => t.type.name).join(', ');
  }
}
