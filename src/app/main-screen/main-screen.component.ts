import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { OverlaySpinnerService } from '../Services/overlay-spinner.service';
import { SharedDialogsService } from '../Services/shared-dialogs.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  spinnersState: Map<string, boolean> = new Map();

  constructor(private overlaySpinnerService: OverlaySpinnerService, public dialog: MatDialog, private sharedDialogsService: SharedDialogsService) { }

  ngOnInit() {
    this.subs.add(this.overlaySpinnerService.changeOverlaySpinnerEmmiter.subscribe((data: {component: string, show: boolean}) => {
      this.spinnersState.set(data.component, data.show);
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
