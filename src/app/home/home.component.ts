import { Component, OnInit, ViewChild } from '@angular/core';
import { DataForChartService } from '../services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Data to print in the chart component
   */
  dataChart = [];
  constructor(private dataForChartService: DataForChartService) { }
  ngOnInit() {
    this.dataForChartService.getData().subscribe(
      (response) => {
        this.dataChart = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
