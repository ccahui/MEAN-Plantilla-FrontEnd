import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  // NO ES BUENA PRACTICA RENOMBRAR LOS INPUTS
  // tslint:disable-next-line:no-input-rename
  @Input('chartLabels') doughnutChartLabels: string[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('chartData') doughnutChartData: number[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('chartType') doughnutChartType = '';

  public colors: Array<any> = [
    { backgroundColor: ['#EF5350', '#42A5F5', '#FFA726'] },
    { borderColor: ['#FF5722', '#AEEBF2', '#F4D03F'] }]; // events
  constructor() { }

  ngOnInit() {
  }

}
