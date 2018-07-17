import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartReadyEvent, ChartErrorEvent} from 'ng2-google-charts';
import * as _ from 'lodash';
/**
 * Draw a Column Chart with selector filter
 */
@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {

  /**
   * Set a reference on the component element will give us component instance
   */
  @ViewChild('cchart') cchart;
  /**
   * Data received by the component
   */
  @Input() data: Array<number> = [];
  /**
   * Configuration of the chart
   */
  protected columnChartConfig: any;
  /**
   * Configuration of the range slider
   */
  protected rangeConfig: any;
  /**
   * Status of chart component
   */
  protected isEnabled = false;
  /**
   * Error message
   */
  protected errorMessage: string;
  /**
   * Keep the last position of slider
   */
  private lastRangePosition: Array<number> = [];
  /**
   * Data of the chart but parsed
   */
  private dataOfCharts: any = [];

  private lengthData: number;

  constructor() { }

  ngOnInit() {
    // Init data
    this.lengthData = this.data.length;
    this.lastRangePosition = [1, this.lengthData];
    this.dataOfCharts = this.parseDataAndOrder(this.data);
    // Configuration of chart component
    this.columnChartConfig =  {
      chartType: 'ColumnChart',
      dataTable: this.dataOfCharts,
      options: {
        height: 250,
        legend: {
          position: 'none',
        }
      },
    };
    // Conguration of range slide
    this.rangeConfig = {
      behaviour: 'drag',
      step: 1,
      start: [1, this.lengthData],
      connect: true,
      tooltips: [true, true],
      margin: 1,
      range: {
        max: this.lengthData,
        min: 1
      },
    };
  }

  /**
   * Emit an event each time the slide is change position
   * @param event any: model data: [1, 8]
   */
  onChangeSlider(event) {
    const currentRangePosition = event; // model data: [1, 8]
    if (this.cchart.wrapper) {
      // Get data to manipulate
      const dataTable = this.cchart.wrapper.getDataTable();
      // Check if the position changed
      if (!_.isEqual(this.lastRangePosition, currentRangePosition)) {
        const leftFirstElement = currentRangePosition[0];
        const rightFirstElement = this.lastRangePosition[0];
        const leftSecondElement = currentRangePosition[1];
        const rightSecondElement = this.lastRangePosition[1];
        if ( leftFirstElement > rightFirstElement) {
          // Correcting the position on the dataTable
          dataTable.setValue(leftFirstElement - 2, 2, 'gray');
        } else {
          dataTable.setValue(leftFirstElement - 1, 2, 'blue');
        }
        if (leftSecondElement < rightSecondElement) {
          dataTable.setValue(leftSecondElement, 2, 'gray');
        } else {
          dataTable.setValue(leftSecondElement - 1, 2, 'blue');
        }
        // force a redraw
        this.cchart.redraw();
        // set the new position
        this.lastRangePosition = currentRangePosition;
      }
    }
  }

  /**
   * Get error if something was wrong
   * @param event ChartErrorEvent
   */
  error(event: ChartErrorEvent) {
    this.errorMessage = event.detailedMessage;
    console.error(event);
  }

  /**
   * Get a message if everything was success
   * @param event ChartReadyEvent
   */
  ready(event: ChartReadyEvent) {
    this.isEnabled = true;
  }

  /**
   * Parse and order the data to chart model
   * @param data Array<number>
   */
  private parseDataAndOrder(data: Array<number>) {
    const dataParsed: Array<any> = [];
    // order elements and push it
    _.reverse(_.sortBy(data)).forEach(element => {
      dataParsed.push(['', element, 'blue']);
    });
    // push head of object on the top
    dataParsed.unshift(['', '', {role: 'style'}]);
    return dataParsed;
  }
}
