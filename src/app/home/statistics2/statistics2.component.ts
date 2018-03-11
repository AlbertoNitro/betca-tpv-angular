import { Component, ViewChild, OnInit } from '@angular/core';


@Component({
    templateUrl: `statistics2.component.html`,
    styleUrls: [`statistics2.component.css`],
    providers: []
})
export class Statistics2Component implements OnInit {
    static URL = 'statistics2';

    // Attributos gráfica %Productos vendidos
    public doughnutChartLabels: string[] = ['Producto1', 'Producto2', 'Producto3'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType = 'doughnut';

    // Atributos gráfica Comparación valor producto y beneficio real
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ingresos sin cescuento' },
        { data: [28, 48, 40, 19, 56, 55, 35], label: 'Ingresos con cescuento' }
    ];

    // Atributos gráfica historico productos
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Producto A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Producto B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Producto C' }
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    public lineChartLegend = true;
    public lineChartType = 'line';

    public randomize(): void {
        const _lineChartData: Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    constructor() {
    }

    ngOnInit(): void {

    }

    refreshChart(event): void {
        console.log(event);
    }

}
