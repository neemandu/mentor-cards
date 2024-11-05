import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-clients-card',
  templateUrl: './home-page-clients-card.component.html',
  styleUrls: ['./home-page-clients-card.component.css'],
})
export class HomePageClientsCardComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  clientList = [
    { name: 'Client 1', image: '/assets/New/home-page/clients/1.png' },
    { name: 'Client 2', image: '/assets/New/home-page/clients/1.png' },
    { name: 'Client 3', image: '/assets/New/home-page/clients/1.png' },
    { name: 'Client 4', image: '/assets/New/home-page/clients/1.png' },
    { name: 'Client 5', image: '/assets/New/home-page/clients/1.png' },
    { name: 'Client 6', image: '/assets/New/home-page/clients/1.png' },
    { name: 'Client 7', image: '/assets/New/home-page/clients/1.png' },
    { name: 'Client 8', image: '/assets/New/home-page/clients/1.png' },
    { name: 'Client 9', image: '/assets/New/home-page/clients/16.png' },
    { name: 'Client 10', image: '/assets/New/home-page/clients/14.png' },
    { name: 'Client 11', image: '/assets/New/home-page/clients/15.png' },
    { name: 'Client 12', image: '/assets/New/home-page/clients/16.png' },
    { name: 'Client 13', image: '/assets/New/home-page/clients/17.png' },
    { name: 'Client 14', image: '/assets/New/home-page/clients/18.png' },
    { name: 'Client 16', image: '/assets/New/home-page/clients/1.png' },
    { name: 'Client 17', image: '/assets/New/home-page/clients/2.png' },
    { name: 'Client 18', image: '/assets/New/home-page/clients/4.png' },
    { name: 'Client 19', image: '/assets/New/home-page/clients/13.png' },
    { name: 'Client 20', image: '/assets/New/home-page/clients/9.png' },
    { name: 'Client 21', image: '/assets/New/home-page/clients/10.png' },
    { name: 'Client 22', image: '/assets/New/home-page/clients/11.png' },
    { name: 'Client 23', image: '/assets/New/home-page/clients/12.png' },
    { name: 'Client 24', image: '/assets/New/home-page/clients/13.png' },
    { name: 'Client 25', image: '/assets/New/home-page/clients/15.png' },
  ];

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
