import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService, User } from 'src/app/API.service';
import { MatTableDataSource } from '@angular/material/table';
import { ManagementService } from 'src/app/Services/management.service';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'entries'];
  topUsers: any[];
  allUsers: any[];
  users: any[];
  cards: any[];
  subs: number;
  constructor(private api: APIService, public mngService: ManagementService) { }

  ngOnInit(): void {
    this.mngService.overlaySpinner(true);
    this.dataSource = new MatTableDataSource(this.topUsers);
    this.chartOptions = {
      series: [],
      chart: {
        width: 480,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.getAllData();
  }

  getAllData(): void {
    this.api.ListCardsPacks().then((res) => {
      this.cards = [...res.items];
      var series = [];
      var labels = [];
      for(var i =0 ; i< this.cards.length; i++){
        var length = 0;
        if(this.cards[i].usersUsage){
          const unique = [...new Set(this.cards[i].usersUsage.map((item) => item.user))];
          length = unique.length;
        }
        series.push(length);
        labels.push(this.cards[i].name);
      }
      this.chartOptions.series = series;
      labels.sort
      this.chartOptions.labels = labels;
      console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 28 ~ this.api.ListCardsPacks ~ this.cards", this.cards);
      this.mngService.overlaySpinner(false);
    });
    this.api.ListUsers().then((res) => {
      this.users = [...res.items];
      this.topUsers = this.users.sort((a, b) => b.entries - a.entries);
      this.dataSource = new MatTableDataSource(this.users.sort((a, b) => b.entries - a.entries));
      this.subs = this.users.filter(arr => {
        if(arr.status == "PLAN"){
          return true;
        }
        return false;
      }).length;
      console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 38 ~ this.api.topUsers ~ this.topUsers", this.topUsers);
    });
  }

}
