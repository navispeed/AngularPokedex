import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from 'app/services/pokemon.service';
import {StatsService} from 'app/services/stats.service';
import {TypeService} from 'app/services/type.service';
import {DetailService} from 'app/search/detail/detail.service';
import 'rxjs-compat/add/observable/empty';
import {SpeciesService} from 'app/search/detail/species.service';
import {Graph} from 'app/search/detail/detail.model';
import {BookmarkService} from 'app/bookmark/bookmark.service';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [DetailService, StatsService, TypeService, SpeciesService]
})
export class DetailComponent implements OnInit {
  public pokemon: PokemonWithAllProperties;
  public pokemonTypeStat: [string, Pokemon.Stat[]][];
  public description: string;
  public graphSwitchChecked: boolean;
  private id: number;
  isBookmarked: boolean;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Type';
  showYAxisLabel = true;
  yAxisLabel = 'Points';
  graphStat: Graph[];

  constructor(private route: ActivatedRoute,
              private pokemonService: PokemonService,
              private detailService: DetailService,
              private speciesService: SpeciesService,
              private bookmarkService: BookmarkService) {
    this.route.queryParams.flatMap(() => {
      this.id = parseInt(this.route.snapshot.params['id'], 10);
      detailService.makeTypeStat(this.id).subscribe(r => {
        this.pokemonTypeStat = Array.from(r.entries());
        this.detailService.generateStat(new Map<string, Pokemon.Stat[]>(this.pokemonTypeStat), this.pokemon)
          .subscribe((graphStat) => this.graphStat = graphStat);
      });
      return pokemonService.getById(this.id);
    }).subscribe(this.onReceivePokemon.bind(this));
  }

  ngOnInit() {
  }

  public generateClassForType(name: string): string {
    return 'tag ' + this.detailService.getColorForType(name);
  }

  public toogleBookmark() {
    this.bookmarkService.toogle(this.pokemon.id);
    this.isBookmarked = this.bookmarkService.isSaved(this.pokemon.id);
  }

  private onReceivePokemon(pokemon: PokemonWithAllProperties) {
    this.pokemon = pokemon;
    this.speciesService.getSpecie(pokemon.species).map(specie => this.speciesService.extractDescription(specie, 'en'))
      .subscribe(result => this.description = result);
  }

}
