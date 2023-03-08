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
  topUsers: any[];
  users: any[];
  cards: any[];
  constructor(private api: APIService, public mngService: ManagementService) { }

  ngOnInit(): void {
    this.mngService.overlaySpinner(true);
    this.dataSource = new MatTableDataSource(this.topUsers);
    this.chartOptions = {
      series: [],
      chart: {
        width: 380,
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
          length = this.cards[i].usersUsage.length;
        }
        series.push(length);
        labels.push(this.cards[i].name);
      }
      this.chartOptions.series = series;
      this.chartOptions.labels = labels;
      console.log(this.chartOptions.series);
      console.log(this.chartOptions.labels);
      console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 28 ~ this.api.ListCardsPacks ~ this.cards", this.cards);
      this.mngService.overlaySpinner(false);
    });
    this.api.ListUsers().then((res) => {
      this.users = [...res.items];
      this.topUsers = this.users.sort((a, b) => (a.entries > b.entries) ? 1 : -1).slice(0, 20);
      this.dataSource = new MatTableDataSource(this.users.sort((a, b) => a.entries - b.entries).slice(0, 20));
      console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 38 ~ this.api.ListUsers ~ this.users", this.users);
    });
  }

}
