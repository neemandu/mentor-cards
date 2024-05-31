import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-footer',
  templateUrl: './home-page-footer.component.html',
  styleUrls: ['./home-page-footer.component.css']
})
export class HomePageFooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  openNewTab(): void {
    const url = 'https://mentor-cards.vp4.me/my-courses';
    window.open(url, '_blank');
  }
  

}
