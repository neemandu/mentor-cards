import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { APIService } from '../API.service';
import { PackContent } from '../Objects/packs';
import { CardsService } from './cards.service';
import { OverlaySpinnerService } from './overlay-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  baseURL = environment.baseurl;

  constructor(private http: HttpClient, public _snackBar: MatSnackBar,
    private overlaySpinnerService: OverlaySpinnerService,
    public cardService: CardsService) { }

  overlaySpinner(active: boolean): void {
    this.overlaySpinnerService.changeOverlaySpinner(active);
  }

  getAllPacks(): PackContent[] {
    if(!this.cardService.allPacks){
      this.cardService.getAllPacks();
    }
    return this.cardService.allPacks;
  }

  snackBarPositive(text): void {
    this._snackBar.open(text, '', {
      duration: 3000,
      panelClass: ['rtl-snackbar']
    });
  }

  snackBarNegative(text): void {
    let snackBarRef = this._snackBar.open(text, 'רענן', {
      duration: 10000,
      panelClass: ['rtl-error-snackbar']
    });
    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    });
  }



}
