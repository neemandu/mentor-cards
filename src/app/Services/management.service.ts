import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { APIService } from '../API.service';
import { OverlaySpinnerService } from './overlay-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  baseURL = environment.baseurl;

  constructor(private http: HttpClient, public _snackBar: MatSnackBar,
    private overlaySpinnerService: OverlaySpinnerService, private api: APIService) { }

  async getAllCouponCodes() {
    let res = await this.api.ListCouponCodess();
    console.log("🚀 ~ file: management.service.ts ~ line 19 ~ getAllCouponCodes ~ res", res)
    return res.items;
  }

}
