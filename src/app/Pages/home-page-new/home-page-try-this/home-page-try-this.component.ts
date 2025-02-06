import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-try-this',
  templateUrl: './home-page-try-this.component.html',
  styleUrls: ['./home-page-try-this.component.css']
})
export class HomePageTryThisComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
