import { Component, OnInit } from '@angular/core';
import { APIService } from './API.service';
import { CardsPack } from '../types/cardsPacks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'mentor-cards';

  cardsPacks: Array<CardsPack>;

  constructor(private api: APIService) { }

  async ngOnInit() {
    /* fetch cards when app loads */
    this.api.ListCardsPacks().then(event => {
      this.cardsPacks = event.items;
    });
  }
}
