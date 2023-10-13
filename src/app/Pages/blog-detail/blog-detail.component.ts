import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButterCMSService } from 'src/app/Services/butter-cms.service';
import {ViewEncapsulation} from '@angular/core'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogDetailComponent implements OnInit {

  blogPost:any
  date!: string
  html!: SafeHtml

  constructor(
    private route: ActivatedRoute,
    private butterService: ButterCMSService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.butterService.getPost(slug)
    .subscribe((res: any) => {
      this.blogPost = res.data
      this.date = new Date(this.blogPost.created).toISOString().split('T')[0]
      this.html = this.sanitizer.bypassSecurityTrustHtml(this.blogPost.body);
  }, (error: any) => {
      console.error('Error retrieving post:', error);
    });
  }
}
