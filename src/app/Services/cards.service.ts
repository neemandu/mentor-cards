import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackContent, PackInfo } from '../Objects/packs';
import { addCardsPackInput, APIService } from '../API.service';
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

  constructor(private http: HttpClient, public _snackBar: MatSnackBar, private userAuthService: UserAuthService) {
    this.Subscription.add(this.userAuthService.signedOutEmmiter.subscribe(() => {
      this.allPacks = undefined;
    }))
    this.Subscription.add(this.userAuthService.loggedInEmmiter.subscribe((userData: UserData) => {
      this.allPacks = undefined;
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

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  public getPackById(id: any): Observable<any> {
    return this.http.get<any>(this.baseURL + this.apiControllerName + 'cards?id=' + id, { headers: this.headerDict });
  }

  public getAllCardPacks(): Observable<any> {
    return this.http.get<any>(this.baseURL + this.apiControllerName + 'allcards', { headers: this.headerDict });
  }
}
