import { OnInit, ViewChild, Component, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { BaseChartDirective } from 'ng2-charts';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'app-income-comparison-chart',
    templateUrl: 'incomeComparisonChart.component.html',
    styleUrls: ['statistics2.component.css'],
    providers: []
})

export class IncomeComparisonChartComponent implements OnInit {

    @ViewChild('chartIncomeComparison') chartIncomeComparison: BaseChartDirective;
    initDate = new FormControl(new Date());
    endDate = new FormControl(new Date());
    constructor(private snackBar: MatSnackBar) { }
    // Atributos gráfica percentage
    public disabled = false;
    public barChartLabels: string[] = ['product1', 'product2'];
    public barChartType = 'bar';
    public barChartLegend = true;
    private benefitLiteral = 'Benefit';
    private priceProductLiteral = 'Price of product';
    public barChartData: any[] = [
        { data: [65, 59], label: this.benefitLiteral },
        { data: [28, 48], label: this.priceProductLiteral }
    ];

    ngOnInit(): void { }

    refreshPercentageChart(): void {
        this.disabled = true;
        // hacer llamada al servicio

        this.barChartLabels = ['product1', 'product2', 'product3', 'product4', 'product5', 'product6', 'product7'];
        this.barChartData.length = 0;
        const aux = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: this.benefitLiteral },
            { data: [28, 48, 40, 19, 86, 27, 90], label: this.priceProductLiteral }
        ];
        for (const item of aux) {
            this.barChartData.push(item);
        }

        this.disabled = false;
    }

    private showError(msg: string) {
        this.snackBar.open(msg, 'Error', {
            duration: 8000
        });
    }
}
