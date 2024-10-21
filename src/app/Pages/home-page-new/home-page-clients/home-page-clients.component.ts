import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-home-page-clients',
  templateUrl: './home-page-clients.component.html',
  styleUrls: ['./home-page-clients.component.css']
})
export class HomePageClientsComponent implements AfterViewInit {
  @ViewChild('countUpSection') countUpSection: ElementRef;

  ngAfterViewInit() {
    const options = {
      duration: 10,
      formattingFn: function (value) {
        return "+" + value;
      }
    };

    let countUp1 = new CountUp('countUp1', 40, options);
    let countUp2 = new CountUp('countUp2', 7800, options);
    let countUp3 = new CountUp('countUp3', 300, options);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting === true) {
        if (!countUp1.error) {
          countUp1.start();
        } else {
          console.error(countUp1.error);
        }

        if (!countUp2.error) {
          countUp2.start();
        } else {
          console.error(countUp2.error);
        }

        if (!countUp3.error) {
          countUp3.start();
        } else {
          console.error(countUp3.error);
        }

        observer.unobserve(this.countUpSection.nativeElement);
      }
    }, { threshold: [0] });

    observer.observe(this.countUpSection.nativeElement);
  }
}