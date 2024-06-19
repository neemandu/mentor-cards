import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackContent } from '../Objects/packs';
import { UserAuthService } from './user-auth.service';
import { UserData } from '../Objects/user-related';
import { APIService } from '../API.service';
import { OverlaySpinnerService } from './overlay-spinner.service';
// import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  isLoggedIn: boolean = false;
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
  categoriesOrder: string[] = ['ערכות להתנסות חופשית', 'ערכות חדשות', 'VIP ערכות', 'ערכות VIP', 'נעים להכיר', 'קלפי תמונה', 'שיתופי פעולה', 'קלפי שאלות', 'קלפי חגים', 'קלפי מילה', 'קלפי תמונה + מילה', 'קלפי מסרים', 'קלפי ערכים', 'ערכות במתנה', 'קלפי NLP', 'NLP קלפי', 'הייטק'];

  constructor(private http: HttpClient, public _snackBar: MatSnackBar, private userAuthService: UserAuthService,
    private overlaySpinnerService: OverlaySpinnerService, private api: APIService) {

    this.Subscription.add(this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      this.isLoggedIn = userData ? true : false;
      this.allPacks = undefined;
    }));

    this.Subscription.add(this.userAuthService.addCouponCodeToFavs.subscribe((ids: string[]) => {
      this.addFavoritesFromCouponCode(ids);
    }));
    var favs = localStorage.getItem("MentorCardFavorites")
    this.isLoggedIn = this.userAuthService.isLoggedIn;
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
    ids?.forEach(id => {
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
    let nextToken = null;
    let items = [];
    let lang = '';
    if (localStorage.getItem('packsLanguage') != null) {
      lang = localStorage.getItem('packsLanguage').toLowerCase();
    } else{
      lang = 'ru';
    }
    const filterCondition = {
      or: [
        { language: { eq: lang } },
        { language: { attributeExists: false } }
      ]
    };

    const fetchPacks = (nextToken) => {
      return this.isLoggedIn ? this.api.ListCardsPacks(filterCondition, 100, nextToken) :
        this.api.ListCardsPacksForPreview(filterCondition, 100, nextToken);
    };

    const fetchAllPacks = async () => {
      do {
        const packs = await fetchPacks(nextToken);
        items = items.concat(packs.items);
        nextToken = packs.nextToken;
      } while (nextToken);

      this.allPacks = items.map(pack => {
        pack.categories.forEach(category => {
          if (!this.allCategories.includes(category))
            this.allCategories.push(category);
        });
        this.allCategories.sort((a, b) => {
          return this.categoriesOrder.indexOf(a) - this.categoriesOrder.indexOf(b);
        });
        return new PackContent().deseralize(pack)
      });
      this.sortPacks();
      this.allPacksReadyEmmiter.emit();
      this.overlaySpinnerService.changeOverlaySpinner(false);
    };

    fetchAllPacks().catch(reject => {
      console.log('reject');
      console.log(reject);
      this.overlaySpinnerService.changeOverlaySpinner(false);
      let snackBarRef = this._snackBar.open('שגיאה במשיכת ערכות הקלפים, נסו שנית', 'רענן', {
        duration: 20000,
      });
      snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    });
  }
  /**
   * Save pack after changes 
   * @param index - index of pack
   * @param res - data to turn into pack
   */
  setPackAfterChanges(index: number, res: any): void {
    this.allPacks[index] = new PackContent().deseralize(res);
    // this.allPacksReadyEmmiter.emit();
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

  // getCategoryColor(category: string): string {
  //   return this.categoryColor.get(category);
  // }

  public getPackById(id: any): Observable<any> {
    return this.http.get<any>(this.baseURL + this.apiControllerName + 'cards?id=' + id, { headers: this.headerDict });
  }

  public getAllCardPacks(): Observable<any> {
    return this.http.get<any>(this.baseURL + this.apiControllerName + 'allcards', { headers: this.headerDict });
  }
}
