import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PackInfo } from 'src/app/Objects/packs';
import { MixpanelService } from 'src/app/Services/mixpanel.service';

@Component({
  selector: 'app-about-author',
  templateUrl: './about-author.component.html',
  styleUrls: ['./about-author.component.css']
})
export class AboutAuthorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public packInfo: PackInfo, public dialogRef: MatDialogRef<AboutAuthorComponent>,
  private mixpanel: MixpanelService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  redirect(): void {
    this.mixpanel.track("RedirectToExternalCreator", 
    {"Pack ID": this.packInfo.id, 
    "Pack name" : this.packInfo.name,
    "Link" : this.packInfo.about.link});
    window.open(this.packInfo.about.link, '_blank');
  }

}
