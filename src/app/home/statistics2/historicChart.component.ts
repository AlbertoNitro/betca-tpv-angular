import { OnInit, ViewChild, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BaseChartDirective } from 'ng2-charts';


@Component({
    selector: 'app-historic-chart',
    templateUrl: `historicChart.component.html`,
    styleUrls: [`statistics2.component.css`],
    providers: []
})

export class HistoricChartComponent {

    @ViewChild('chartHistoric') chartHistoric: BaseChartDirective;

    constructor() { }
    // Atributos gráfica Historical products
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Producto A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Producto B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Producto C' }
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    public lineChartLegend = true;
    public lineChartType = 'line';


    refreshHistoricalProductsChart(): void {
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40, 5, 81, 56, 55, 40, 5], label: 'Producto A' },
            { data: [28, 48, 40, 19, 86, 27, 90, 5, 19, 86, 27, 90, 5], label: 'Producto B' },
            { data: [18, 48, 77, 9, 100, 27, 40, 5, 9, 100, 27, 40, 5], label: 'Producto C' }
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'March', 'April', 'May', 'June', 'July'];
        if (this.chartHistoric !== undefined) {
            this.chartHistoric.chart.destroy();
            this.chartHistoric.chart = 0;

            this.chartHistoric.datasets = this.lineChartData;
            this.chartHistoric.labels = this.lineChartLabels;
            this.chartHistoric.ngOnInit();
        }
    }


}
