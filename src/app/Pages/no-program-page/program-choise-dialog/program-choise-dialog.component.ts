import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as bundleConfigs from 'src/assets/Bundle Configurations/BundleConfigs.json'

@Component({
  selector: 'app-program-choise-dialog',
  templateUrl: './program-choise-dialog.component.html',
  styleUrls: ['./program-choise-dialog.component.css']
})
export class ProgramChoiseDialogComponent implements OnInit {

  isLinear = true;
  numOfPeople: string = '1';
  numOfPacks: string = '2';

  constructor() {
    // console.log(bundleConfigs['default'])
  }

  ngOnInit(): void {
  }

  getPeopleNum(): string {
    return amountOfPeople['u-' + this.numOfPeople];
  }

  getPackNum(): string {
    return amountOfPacks['p-' + this.numOfPacks];
  }

  calcPrice(numOfPacks: number): number {
    switch (this.numOfPeople) {
      case '1':
        return 1;
      case '3':
        return 3;
      case '10':
        return 10;
      case '50':
        return 50;
    }
  }

  printChange(): void {
    // console.log(this.numOfPeople);
    // console.log(this.numOfPacks);
  }
}

export enum amountOfPeople {
  'u-1' = "משתמש יחיד",
  'u-3' = "3 משתמשים",
  'u-10' = "10 משתמשים",
  'u-50' = "50 משתמשים"
}

export enum amountOfPacks {
  'p-2' = '2 חפיסות',
  'p-5' = '5 חפיסות',
  'p--1' = 'ללא הגבלה'
}
