import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GroupData } from 'src/app/Objects/user-related';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {

  groupData: GroupData;
  Subscription: Subscription = new Subscription();

  constructor(private overlaySpinnerService: OverlaySpinnerService, private userAuthService: UserAuthService, public dialog: MatDialog, private cardsService: CardsService) {
    this.groupData = this.userAuthService.groupData;
    this.overlaySpinnerService.changeOverlaySpinner(false)
    //TODO create table and modals for editing users
  }

  ngOnInit(): void {
    this.Subscription.add(this.userAuthService.groupDataEmmiter.subscribe((groupData: GroupData) => {
      this.groupData = this.userAuthService.groupData;
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }));
  }

}
