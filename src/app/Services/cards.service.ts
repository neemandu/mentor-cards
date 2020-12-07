import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PackInfo } from '../Objects/packs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  allPacks: PackInfo[];
  allCategories: string[] = [];
  favorites: any[] = [];

  constructor(private http: HttpClient, public _snackBar: MatSnackBar) {
    var favs = localStorage.getItem("MentorCardFavorites")
    if (favs) {
      this.favorites = favs.split(',');
      this.favoriteChangeEmmiter.emit(this.favorites);
    }
  }

  addRemoveFavorite(id: number): boolean {
    if (this.favorites.includes(id)) {
      this.favorites.splice(this.favorites.findIndex(favId => favId == id), 1)
    } else {
      this.favorites.push(id);
    }
    localStorage.setItem("MentorCardFavorites", this.favorites.join(','))
    this.favoriteChangeEmmiter.emit(this.favorites);
    return this.isFavorite(id);
  }

  isFavorite(id: number): boolean {
    return this.favorites.includes(id);
  }

  public getPackById(id: any): Observable<any> {
    return this.http.get<any>(this.baseURL + this.apiControllerName + 'cards?id=' + id, { headers: this.headerDict });
  }

  public getAllCardPacks(): Observable<any> {
    return this.http.get<any>(this.baseURL + this.apiControllerName + 'allcards', { headers: this.headerDict });
  }
}
