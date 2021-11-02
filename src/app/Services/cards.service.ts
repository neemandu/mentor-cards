import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackContent } from '../Objects/packs';
import { UserAuthService } from './user-auth.service';
import { UserData } from '../Objects/user-related';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  baseURL = environment.baseurl;
  apiControllerName = 'dev/'

  headerDict = {
    'Content-Type': 'application/json',
  }

  @Output() favoriteChangeEmmiter: EventEmitter<number[]> = new EventEmitter();

  Subscription: Subscription = new Subscription();
  allPacks: PackContent[];
  allCategories: string[] = [];
  favorites: any[] = [];
  categoryColor = new Map<string, string>([['קלפי תמונה', '#89f4ff'], ['קלפי תמונה + מילה', '#ff3af0d1'], ['קלפי מילה', '#c789ff'], ['קלפי שאלות', '#ff8989'], ['קלפי מסרים', '#5581ff']]);


  constructor(private http: HttpClient, public _snackBar: MatSnackBar, private userAuthService: UserAuthService) {
    this.Subscription.add(this.userAuthService.signedOutEmmiter.subscribe(() => {
      this.allPacks = undefined;
    }))
    this.Subscription.add(this.userAuthService.loggedInEmmiter.subscribe((userData: UserData) => {
      this.allPacks = undefined;
    }));
    this.Subscription.add(this.userAuthService.addCouponCodeToFavs.subscribe((ids: string[]) => {
      // console.log("file: cards.service.ts ~ line 39 ~ this.Subscription.add ~ ids", ids)
      this.addFavoritesFromCouponCode(ids);
    }));
    var favs = localStorage.getItem("MentorCardFavorites")
    if (favs) {
      this.favorites = favs.split(',');
      this.favoriteChangeEmmiter.emit(this.favorites);
    }
  }

  addRemoveFavorite(id: string): boolean {
    if (this.favorites.includes(id)) {
      this.favorites.splice(this.favorites.findIndex(favId => favId == id), 1)
    } else {
      this.favorites.push(id);
    }
    localStorage.setItem("MentorCardFavorites", this.favorites.join(','))
    this.favoriteChangeEmmiter.emit(this.favorites);
    return this.isFavorite(id);
  }

  addFavoritesFromCouponCode(ids: string[]): void {
    ids.forEach(id => {
      if (!this.favorites.includes(id) && !this.couponCodeAddedToFav(id)) {
        this.favorites.push(id);
        this.setCouponCodeAddedToFav(id);
      }
    });
    localStorage.setItem("MentorCardFavorites", this.favorites.join(','))
    this.favoriteChangeEmmiter.emit(this.favorites);
  }

  couponCodeAddedToFav(id: string): boolean {
    return localStorage.getItem('couponCodeAddedToFav')?.split(',').includes(id);
  }

  setCouponCodeAddedToFav(id: string): void {
    let couponCodes = localStorage.getItem('couponCodeAddedToFav') ? localStorage.getItem('couponCodeAddedToFav').split(',') : [];
    couponCodes.push(id);
    localStorage.setItem("couponCodeAddedToFav", couponCodes.join(','))
  }

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  getCategoryColor(category: string): string {
    return this.categoryColor.get(category);
  }

  public getPackById(id: any): Observable<any> {
    return this.http.get<any>(this.baseURL + this.apiControllerName + 'cards?id=' + id, { headers: this.headerDict });
  }

  public getAllCardPacks(): Observable<any> {
    return this.http.get<any>(this.baseURL + this.apiControllerName + 'allcards', { headers: this.headerDict });
  }
}
