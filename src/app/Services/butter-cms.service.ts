import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ButterCMSService {
  private baseUrl = 'https://api.buttercms.com/v2';  
  private authToken = 'babd912fc10861ee3d3d18a8dc47e7872c9438a7';

  private butter: any;

  constructor(private http: HttpClient) {  }

  getPosts() {
    const url = `${this.baseUrl}/posts/?auth_token=${this.authToken}`;
    return this.http.get(url);
  }

  getPost(slug: string) {
    const url = `${this.baseUrl}/posts/${slug}/?auth_token=${this.authToken}`;
    return this.http.get(url);
  }
}
