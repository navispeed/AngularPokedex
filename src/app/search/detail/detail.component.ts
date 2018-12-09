import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private id: number;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(() => {
      this.id = parseInt(this.route.snapshot.params['id'], 10);
    });
  }

  ngOnInit() {
  }

}
