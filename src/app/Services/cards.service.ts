import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackContent } from '../Objects/packs';
import { UserAuthService } from './user-auth.service';
import { UserData } from '../Objects/user-related';
import { APIService, ListCardsPacksQuery } from '../API.service';
import { OverlaySpinnerService } from './overlay-spinner.service';

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
  @Output() allPacksReadyEmmiter: EventEmitter<any> = new EventEmitter();

  Subscription: Subscription = new Subscription();
  allPacks: PackContent[];
  allCategories: string[] = [];
  favorites: any[] = [];
  categoryColor = new Map<string, string>([['קלפי תמונה', '#89f4ff'], ['קלפי תמונה + מילה', '#ff3af0d1'], ['קלפי מילה', '#c789ff'], ['קלפי שאלות', '#ff8989'], ['קלפי מסרים', '#5581ff']]);


  constructor(private http: HttpClient, public _snackBar: MatSnackBar, private userAuthService: UserAuthService,
    private overlaySpinnerService: OverlaySpinnerService, private api: APIService) {
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
    this.sortPacks();
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

  getAllPacks(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    let authStatus = localStorage.getItem('signedin');
    (authStatus === 'true' ? this.api.ListCardsPacks() : this.api.ListCardsPacksForPreview()).then((packs: ListCardsPacksQuery) => {
      // console.log("file: all-packs-page.component.ts ~ line 68 ~ packs", packs)
      this.allPacks = packs.items.map(pack => {
        pack.categories.forEach(category => {
          if (!this.allCategories.includes(category))
            this.allCategories.push(category);
        });
        return new PackContent().deseralize(pack)
      });
      this.sortPacks();
      this.allPacksReadyEmmiter.emit();
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }, reject => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      let snackBarRef = this._snackBar.open('שגיאה במשיכת ערכות הקלפים, נסו שנית', 'רענן', {
        duration: 20000,
      });
      snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    })
  }

  /**
   * Save pack after changes 
   * @param index - index of pack
   * @param res - data to turn into pack
   */
  setPackAfterChanges(index: number, res: any): void {
    this.allPacks[index] = new PackContent().deseralize(res);
    this.allPacksReadyEmmiter.emit();
  }

  /**
   * Sort all packs so that favorites are first 
   */
  sortPacks(): void {
    this.allPacks?.sort((packA, packB) => {
      //free packs
      if (packA.freeUntilDate > new Date())
        return -1;
      if (packB.freeUntilDate > new Date())
        return 1;
      //favorites
      if (this.favorites.includes(packA.id) && this.favorites.includes(packB.id))
        return 0;
      if (this.favorites.includes(packA.id))
        return -1;
      if (this.favorites.includes(packB.id))
        return 1;
      else
        return packA.categories[0].localeCompare(packB.categories[0]);
    })
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
