import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-hero',
  templateUrl: './home-page-hero.component.html',
  styleUrls: ['./home-page-hero.component.css']
})
export class HomePageHeroComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

}
