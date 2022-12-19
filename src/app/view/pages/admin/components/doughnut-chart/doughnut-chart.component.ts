import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Wrong', 'Correct'],
    datasets: [{ data: [] }],
  };

  @Input('correct') correct: number = 0;
  @Input('wrong') wrong: number = 0;
  @Input('total') total: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total']) {
      this.drawDonughtChart();
    }
  }

  drawDonughtChart(): void {
    this.doughnutChartDatasets = {
      labels: ['Wrong', 'Correct'],
      datasets: [
        {
          data: [this.wrong, this.correct],
          backgroundColor: ['#ff6384', '#36a2eb'],
        },
      ],
    };
  }
}
