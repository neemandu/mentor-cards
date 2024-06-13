import { Component, Input, OnInit } from '@angular/core';
import { PackInfo } from 'src/app/Objects/packs';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-packs-card',
  templateUrl: './packs-card.component.html',
  styleUrls: ['./packs-card.component.css']
})
export class PacksCardComponent implements OnInit {

  constructor(public langDirectionService: LangDirectionService, private userAuthService: UserAuthService) { }

  @Input() backgroundColor: string;
  @Input() packInfo: PackInfo;
  fav: boolean = false;
  initialLikeCounter: number = 0;
  isFavCard: boolean = false;

  ngOnInit(): void {
    this.initialLikeCounter = this.packInfo.likesCounter;
  }

  addRemoveFavorite(): void {
    if (!this.fav) {
      this.packInfo.likesCounter += 1;
    }
    this.userAuthService.addRemoveFavorite(this.packInfo.id);
  }


}
