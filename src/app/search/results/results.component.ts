import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SearchService} from 'app/search/search.service';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;

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
    this.searchService.search(this.query).subscribe(result => this.pokemonResult = result);
  }

}
