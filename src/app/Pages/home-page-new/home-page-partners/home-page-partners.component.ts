import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';

@Component({
  selector: 'app-home-page-partners',
  templateUrl: './home-page-partners.component.html',
  styleUrls: ['./home-page-partners.component.css'],
})
export class HomePagePartnersComponent implements OnInit, OnDestroy {
  @Input() isPricePage: boolean = false;
  constructor(
    public router: Router,
    public langDirectionService: LangDirectionService
  ) {}

  logos = [
    {
      src: '../../../assets/About images/Clients/maccabi.png',
      alt: 'Maccabi logo',
    },
    {
      src: '../../../assets/About images/Clients/lishka.png',
      alt: 'Lishka logo',
    },
    {
      src: '../../../assets/About images/Clients/logos.png',
      alt: 'Logos logo',
    },
    {
      src: '../../../assets/About images/Clients/merchaz.png',
      alt: 'Merchaz logo',
    },
    {
      src: '../../../assets/About images/Clients/tnoofa.png',
      alt: 'Tnoofa logo',
    },
    {
      src: '../../../assets/About images/Clients/yozmot.png',
      alt: 'Yozmot logo',
    },
    {
      src: '../../../assets/About images/Clients/standard_logo_transparent.png',
      alt: 'Standard logo',
    },
  ];

  currentLogoIndex = 0;
  isMobile = false;

  private carouselInterval: any;

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 640;
    if (this.isMobile) {
      this.startCarousel();
    } else {
      this.stopCarousel();
    }
  }

  private startCarousel(): void {
    if (this.isMobile && !this.carouselInterval) {
      this.carouselInterval = setInterval(() => {
        this.currentLogoIndex = (this.currentLogoIndex + 1) % this.logos.length;
      }, 2000);
    }
  }

  private stopCarousel(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  handleClick(): void {
    this.router.navigate(['/about-page']);
  }
}
