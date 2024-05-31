import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-partners',
  templateUrl: './home-page-partners.component.html',
  styleUrls: ['./home-page-partners.component.css']
})
export class HomePagePartnersComponent implements OnInit {

  constructor(public router: Router, ) { }

  ngOnInit(): void {
  }

  handleClick(){
    console.log('clicked');
    this.router.navigate(['/about-page']);
  }
}
