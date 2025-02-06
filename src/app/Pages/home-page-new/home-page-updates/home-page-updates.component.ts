import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';

@Component({
  selector: 'app-home-page-updates',
  templateUrl: './home-page-updates.component.html',
  styleUrls: ['./home-page-updates.component.css']
})
export class HomePageUpdatesComponent implements OnInit {

  news: any[] = [];
  constructor(private api: APIService) { }
  ngOnInit(): void {
    this.api.ListNewss().then(news => {
      this.news = news.items.sort((a, b) => a.order - b.order);
    }, error => {
      console.log("file: site-content-management.component.ts ~ line 42 ~ this.api.ListNewss ~ error", error)
    })
  }

}
