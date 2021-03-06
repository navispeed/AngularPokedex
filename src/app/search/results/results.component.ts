import {Component} from '@angular/core';
import {SearchService} from 'app/search/search.service';
import 'rxjs-compat/add/operator/share';
import {ActivatedRoute, Router} from '@angular/router';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  public pokemonResult: Array<PokemonWithAllProperties>;
  private query: String = '';

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.query = this.route.snapshot.params['query'];
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.refreshResult();
    });
  }

  public getPokemonTypes(pokemon: Pokemon.PokemonWithAllProperties): string {
    return pokemon.types.map(t => t.type.name).join(', ');
  }

  public showDetail(id: number) {
    this.router.navigate(['detail', id]);
  }

  private refreshResult(): void {
    const observable = this.searchService.search(this.query).share();
    observable.subscribe(result => this.pokemonResult = result);
  }
}
