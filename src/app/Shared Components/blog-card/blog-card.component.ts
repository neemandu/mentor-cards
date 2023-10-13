import { Input , Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  @Input() slug!: string;
  @Input() image!: string;
  @Input() date!: string;
  @Input() title!: string;
  @Input() summary!: string;
  @Input() authorImage!: string;
  @Input() authorName!: string;

  constructor(
    private ngZone: NgZone,
    private router: Router,) { }

  navigate(): void {
    let path = `/detail/${this.slug}`;
    this.ngZone.run(() => this.router.navigate([path]));
  }

  ngOnInit(): void {

    this.date = new Date(this.date).toISOString().split('T')[0]
  }

}
