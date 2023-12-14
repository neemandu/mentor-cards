import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButterCMSService } from 'src/app/Services/butter-cms.service';
import { MixpanelService } from 'src/app/Services/mixpanel.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  selectedBtn: number = 1;
  title: string = "מרכז למידה";
  playerWidth: number;
  playerHeight: number;
  searchValue = '';
  blogPosts: any[];
  filteredBlogs: any[] = [];
  isSubjectPicked = false;
  categories: any[] = [
    {index: 1, name: "המצב המצוי"},
    {index: 2, name: "התמודדות עם כשלונות"},
    {index: 3, name: "הצבת מטרה"},
    {index: 4, name: "החלום שלי"}];

  constructor(
    private mixpanelService: MixpanelService,
    private butterService: ButterCMSService,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    // track events
    this.mixpanelService.track("PageViewed", { 'Page Title': 'guide-page' });
    this.playerWidth = window.innerWidth;
    this.playerHeight = this.playerWidth / 1.78

    this.butterService.getPosts()
    .subscribe((response: any) => {
      this.blogPosts = response.data;
      this.filteredBlogs = this.blogPosts;
    }, (error: any) => {
      console.error('Error retrieving posts:', error);
    });
  }

  handleCardClick(category): void {
    this.isSubjectPicked = true;
    this.selectedTopicChanged(category.index, category.name);
  }

  selectedTopicChanged(index: number, title: string): void {
    this.title = title;
    this.selectedBtn = index;

    this.filteredBlogs = this.blogPosts.filter((blog) => (
      blog.tags.find(tag => tag.name.trim().toLocaleLowerCase() == title)
    ));
  }
}