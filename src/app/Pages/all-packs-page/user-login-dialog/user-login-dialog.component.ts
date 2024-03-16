import { Component, OnInit } from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';

@Component({
  selector: 'app-user-login-dialog',
  templateUrl: './user-login-dialog.component.html',
  styleUrls: ['./user-login-dialog.component.css']
})
export class UserLoginDialogComponent implements OnInit {

  constructor(
    public langDirectionService: LangDirectionService
  ) { }

  ngOnInit(): void {
  }

}
